/**
 * XSS Attack Test Suite for Hospital Management System
 * 
 * This script tests the input validation and XSS prevention measures
 * implemented in the Hospital Management System frontend.
 * 
 * TEST INSTRUCTIONS:
 * 1. Open the Hospital Management System in a browser
 * 2. Navigate to Login/Register pages
 * 3. Try entering the malicious inputs below
 * 4. Verify that they are blocked/sanitized
 */

// XSS Attack Payloads for Testing
const XSS_TEST_PAYLOADS = {
  // Basic Script Injection
  BASIC_SCRIPT: '<script>alert("XSS Attack!")</script>',
  
  // Event Handler Injection
  IMG_ONERROR: '<img src="x" onerror="alert(\'XSS via image error\')">',
  
  // JavaScript Protocol
  JAVASCRIPT_HREF: 'javascript:alert("XSS via javascript protocol")',
  
  // HTML Injection
  HTML_INJECTION: '<div style="background:red">Malicious HTML</div>',
  
  // Iframe Injection
  IFRAME_INJECTION: '<iframe src="javascript:alert(\'XSS via iframe\')"></iframe>',
  
  // SVG with Script
  SVG_SCRIPT: '<svg onload="alert(\'XSS via SVG\')"></svg>',
  
  // SQL Injection Attempt
  SQL_INJECTION: "admin'; DROP TABLE users; --",
  
  // Command Injection
  COMMAND_INJECTION: "; cat /etc/passwd",
  
  // Buffer Overflow Test
  BUFFER_OVERFLOW: 'A'.repeat(10000),
  
  // Medical Data XSS
  MEDICAL_XSS: 'Patient has <script>fetch("/api/steal-data")</script> symptoms',
};

// Expected Results After Validation
const EXPECTED_RESULTS = {
  BASIC_SCRIPT: '', // Should be completely removed
  IMG_ONERROR: '&lt;img src="x" onerror="alert(\'XSS via image error\')"&gt;', // HTML encoded
  JAVASCRIPT_HREF: 'javascript:alert("XSS via javascript protocol")', // Detected as threat
  HTML_INJECTION: '&lt;div style="background:red"&gt;Malicious HTML&lt;/div&gt;', // HTML encoded
  IFRAME_INJECTION: '', // Should be completely removed
  SVG_SCRIPT: '', // Should be completely removed
  SQL_INJECTION: 'admin\'; DROP TABLE users; --', // Escaped but flagged as threat
  COMMAND_INJECTION: '; cat /etc/passwd', // Flagged as threat
  BUFFER_OVERFLOW: 'A'.repeat(255), // Truncated to limit
  MEDICAL_XSS: 'Patient has  symptoms', // Script removed, text preserved
};

/**
 * Manual Testing Steps:
 * 
 * 1. LOGIN FORM TESTING:
 *    - Navigate to login page
 *    - Enter XSS_TEST_PAYLOADS.BASIC_SCRIPT in email field
 *    - Verify: Input is sanitized and validation error appears
 *    - Enter XSS_TEST_PAYLOADS.SQL_INJECTION in password field
 *    - Verify: Security threat is detected
 * 
 * 2. REGISTER FORM TESTING:
 *    - Navigate to register page
 *    - Enter XSS_TEST_PAYLOADS.HTML_INJECTION in username field
 *    - Verify: HTML is encoded and displayed safely
 *    - Try XSS_TEST_PAYLOADS.BUFFER_OVERFLOW in any field
 *    - Verify: Input is truncated to character limit
 * 
 * 3. MEDICAL FORM TESTING:
 *    - Navigate to diagnosis update page
 *    - Enter XSS_TEST_PAYLOADS.MEDICAL_XSS in symptoms field
 *    - Verify: Script is removed but medical text is preserved
 *    - Enter XSS_TEST_PAYLOADS.IMG_ONERROR in diagnosis field
 *    - Verify: HTML is encoded and validation error appears
 * 
 * 4. REAL-TIME VALIDATION TESTING:
 *    - Start typing XSS_TEST_PAYLOADS.BASIC_SCRIPT in any field
 *    - Verify: Input is sanitized in real-time as you type
 *    - Check that validation errors appear immediately
 * 
 * 5. ERROR MESSAGE SAFETY:
 *    - Verify that all error messages are properly encoded
 *    - Check that no HTML/JavaScript executes in error displays
 */

// Browser Console Test Functions
console.log('='.repeat(60));
console.log('XSS PROTECTION TEST SUITE');
console.log('='.repeat(60));

console.log('\n🧪 Test Payloads to try in forms:');
Object.entries(XSS_TEST_PAYLOADS).forEach(([name, payload]) => {
  console.log(`\n${name}:`);
  console.log(`Input: ${payload}`);
  console.log(`Expected: ${EXPECTED_RESULTS[name] || 'Should be blocked/sanitized'}`);
});

console.log('\n✅ Signs of Successful Protection:');
console.log('- Scripts do not execute');
console.log('- HTML is encoded (shows &lt; &gt; instead of < >)');
console.log('- Validation errors appear for malicious input');
console.log('- Input is truncated if too long');
console.log('- Security threats are logged to console');

console.log('\n🔍 What to look for in Network/Console:');
console.log('- No JavaScript errors from malicious scripts');
console.log('- Warning messages about security threats detected');
console.log('- Sanitized values in form fields');
console.log('- Validation feedback appears in real-time');

console.log('\n🚨 If these tests FAIL (i.e., scripts execute):');
console.log('- STOP testing immediately');
console.log('- Report security vulnerability');
console.log('- Do not use in production');

// Test the validation functions directly (if available)
if (typeof window !== 'undefined') {
  console.log('\n🧬 Testing validation functions:');
  
  // Test if DOMPurify is working
  if (window.DOMPurify) {
    const testScript = '<script>alert("test")</script>';
    const sanitized = window.DOMPurify.sanitize(testScript, {ALLOWED_TAGS: []});
    console.log(`DOMPurify test: ${testScript} → ${sanitized}`);
  }
}

export { XSS_TEST_PAYLOADS, EXPECTED_RESULTS };