import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * Secure HTTP client to prevent SSRF attacks
 */
export class SecureHttpClient {
  private axiosInstance: AxiosInstance;
  private allowedHosts: string[];
  private allowedPorts: number[];

  constructor(
    allowedHosts: string[] = ['localhost', '127.0.0.1'], 
    allowedPorts: number[] = [3000, 3001, 8080]
  ) {
    this.allowedHosts = allowedHosts;
    this.allowedPorts = allowedPorts;
    
    this.axiosInstance = axios.create({
      timeout: 10000, // 10 second timeout
      maxRedirects: 0, // Disable redirects to prevent bypass
    });

    // Add request interceptor to validate URLs
    this.axiosInstance.interceptors.request.use(
      (config) => this.validateRequest(config),
      (error) => Promise.reject(error)
    );
  }

  /**
   * Validate HTTP request to prevent SSRF attacks
   */
  private validateRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (!config.url) {
      throw new Error('Request URL is required');
    }

    const url = this.resolveUrl(config.baseURL, config.url);
    const parsedUrl = new URL(url);

    // 1. Protocol validation - only allow HTTP/HTTPS
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error(`Unsupported protocol: ${parsedUrl.protocol}`);
    }

    // 2. Hostname validation
    if (!this.isHostAllowed(parsedUrl.hostname)) {
      throw new Error(`Unauthorized hostname: ${parsedUrl.hostname}`);
    }

    // 3. Port validation
    const port = parsedUrl.port ? parseInt(parsedUrl.port) : (parsedUrl.protocol === 'https:' ? 443 : 80);
    if (!this.isPortAllowed(port)) {
      throw new Error(`Unauthorized port: ${port}`);
    }

    // 4. Prevent access to private IP ranges (additional safety)
    if (this.isPrivateIp(parsedUrl.hostname) && !this.allowedHosts.includes(parsedUrl.hostname)) {
      throw new Error(`Access to private IP addresses is not allowed: ${parsedUrl.hostname}`);
    }

    // 5. Block common bypass attempts
    if (this.containsBypassAttempt(url)) {
      throw new Error('Potential SSRF bypass attempt detected');
    }

    return config;
  }

  /**
   * Resolve relative URLs with base URL
   */
  private resolveUrl(baseURL: string | undefined, url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    if (baseURL) {
      return new URL(url, baseURL).href;
    }
    
    return url;
  }

  /**
   * Check if hostname is in allowlist
   */
  private isHostAllowed(hostname: string): boolean {
    return this.allowedHosts.some(allowedHost => {
      // Exact match
      if (hostname === allowedHost) return true;
      
      // Subdomain match
      if (hostname.endsWith(`.${allowedHost}`)) return true;
      
      return false;
    });
  }

  /**
   * Check if port is allowed
   */
  private isPortAllowed(port: number): boolean {
    return this.allowedPorts.includes(port);
  }

  /**
   * Check if IP is in private range
   */
  private isPrivateIp(hostname: string): boolean {
    const privateIpRegex = /^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|127\.|169\.254\.|::1|localhost)$/;
    return privateIpRegex.test(hostname);
  }

  /**
   * Detect common SSRF bypass attempts
   */
  private containsBypassAttempt(url: string): boolean {
    const bypassPatterns = [
      // IP encoding bypasses
      /0x[0-9a-f]+/i, // Hexadecimal IP
      /0[0-7]+/, // Octal IP
      /\d+/, // Decimal IP (if not in normal format)
      
      // URL encoding bypasses
      /%[0-9a-f]{2}/i,
      
      // Unicode bypasses
      /[^\x00-\x7F]/,
      
      // Protocol confusion
      /javascript:|data:|file:|ftp:/i,
      
      // Authority bypass attempts
      /@/,
      
      // Double encoding
      /%25/i,
    ];

    return bypassPatterns.some(pattern => pattern.test(url));
  }

  /**
   * Secure GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  /**
   * Secure POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  /**
   * Secure PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  /**
   * Secure DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

// Create default secure client instance
export const secureHttpClient = new SecureHttpClient(
  // Allowed hosts for this application
  ['localhost', '127.0.0.1', 'api.hospital-app.com'],
  // Allowed ports
  [3000, 3001, 8080, 443, 80]
);

export default secureHttpClient;