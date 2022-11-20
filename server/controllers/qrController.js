const qrcode = require("qrcode");
// JWT for authentication token
const jwt = require("jsonwebtoken");

// Import model schemas
const QRCode = require("../model/qrCode");
const User = require("../model/user");
// Import Error Keys
const errors = require("../errors");

exports.generate_qrcode = async (req, res) => {
	try {
		const { userId } = req.body;

		// Validate user input
		if (!userId) {
			res.status(400).send("User Id is required");
		}

		const user = await User.findById(userId);

		// Validate is user exist
		if (!user) {
			res.status(400).send("User not found");
		}

		const qrExist = await QRCode.findOne({ userId });

		// If qr exist, update disable to true and then create a new qr record
		if (!qrExist) {
			await QRCode.create({ userId });
		} else {
			await QRCode.findOneAndUpdate(
				{ userId },
				{ $set: { disabled: true } },
			);
			await QRCode.create({ userId });
		}

		// Generate encrypted data
		const encryptedData = jwt.sign(
			{ userId: user._id },
			process.env.TOKEN_KEY,
			{
				expiresIn: "1d",
			},
		);

		// Generate qr code
		const dataImage = await qrcode.toDataURL(encryptedData);

		// Return qr code
		return res.status(200).json({ dataImage });
	} catch (err) {
		console.log(err);
	}
};

exports.scan_qrcode = async (req, res) => {
	try {
		const { token, deviceInformation } = req.body;

		if (!token && !deviceInformation) {
			res.status(400).send("Token and deviceInformation is required");
		}

		const decoded = jwt.verify(token, process.env.TOKEN_KEY);

		const qrCode = await QRCode.findOne({
			userId: decoded.userId,
			disabled: false,
		});

		if (!qrCode) {
			res.status(400).send("QR Code not found");
		}

		const connectedDeviceData = {
			userId: decoded.userId,
			qrCodeId: qrCode._id,
			deviceName: deviceInformation.deviceName,
			deviceModel: deviceInformation.deviceModel,
			deviceOS: deviceInformation.deviceOS,
			deviceVersion: deviceInformation.deviceVersion,
		};

		const connectedDevice = await ConnectedDevice.create(
			connectedDeviceData,
		);

		// Update qr code
		await QRCode.findOneAndUpdate(
			{ _id: qrCode._id },
			{
				isActive: true,
				connectedDeviceId: connectedDevice._id,
				lastUsedDate: new Date(),
			},
		);

		// Find user
		const user = await User.findById(decoded.userId);

		// Create token
		const authToken = jwt.sign(
			{ user_id: user._id },
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			},
		);

		// Return token
		return res.status(200).json({ token: authToken });
	} catch (err) {
		console.log(err);
	}
};
