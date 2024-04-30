// services/otpService.js

let otpData
module.exports = {
  generateOTP: () => {
    // Generate and return OTP (You can implement your logic here)
    
    otpData = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    console.log(`my send opt is ${otpData}`)
    return otpData
  },
  validateOTP: (otp) => {
    console.log(otp)
    // Validate OTP (You can implement your logic here)
    return otpData == otp
      // /^\d{4}$/.test(otp); // Check if OTP is a 4-digit number
  },
};
