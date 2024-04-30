const User = require('../model/user');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  console.log("verifing refesh token")
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err) return res.sendStatus(403); //Forbidden
                // Delete refresh tokens of hacked user
                const hackedUser = await User.findOne({ phoneNumber: decoded.phoneNumber }).exec();
                hackedUser.refreshToken = [];
                const result = await hackedUser.save();
            }
        )
        return res.sendStatus(403); //Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                // expired refresh token
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            }
            if (err || foundUser.phoneNumber !== decoded.phoneNumber) return res.sendStatus(403);

            // Refresh token was still valid
              console.log("this is ingo in new access token", decoded);
            
            const accessToken = jwt.sign(
              {
                userInfo: {
                  id: foundUser._id,
                  phoneNumber: foundUser.phoneNumber,
                  isAdmin: foundUser.isAdmin,
                },
              },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "1m" }
            );

            const newRefreshToken = jwt.sign(
                { "phoneNumber": foundUser.phoneNumber },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();
            console.log(accessToken)

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.json({
              accessToken,
              user: {
                id: foundUser?._id,
                name: foundUser?.name,
                email: foundUser?.email,
                phoneNumber: foundUser?.phoneNumber,
                profileUrl: foundUser?.profileUrl,
                admin: foundUser?.isAdmin,
              },
            });
        }
    );
}

module.exports = { handleRefreshToken }