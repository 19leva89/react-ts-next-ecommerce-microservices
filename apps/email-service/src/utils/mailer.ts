import nodemailer from 'nodemailer'

// Get environment variables
const oAuthEmail = process.env.OAUTH_EMAIL || ''
const oAuthClientId = process.env.OAUTH_CLIENT_ID || ''
const oAuthClientSecret = process.env.OAUTH_CLIENT_SECRET || ''
const oAuthRefreshToken = process.env.OAUTH_REFRESH_TOKEN || ''

// Create reusable transporter object using the default SMTP transport
const createTransporter = async () => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAuth2',
				user: oAuthEmail,
				clientId: oAuthClientId,
				clientSecret: oAuthClientSecret,
				refreshToken: oAuthRefreshToken,
			},
			debug: false,
			logger: false,
		})

		// Verify connection configuration
		transporter.verify((error) => {
			if (error) {
				console.error('SMTP connection error:', error)
			} else {
				console.log('SMTP server is ready to send emails')
			}
		})

		return transporter
	} catch (error) {
		console.error('Error creating transporter:', error)

		throw error
	}
}

interface Props {
	to: string
	subject: string
	text: string
}

export const sendMail = async ({ to, subject, text }: Props) => {
	try {
		const transporter = await createTransporter()

		const info = await transporter.sendMail({
			from: `"Trend Dima" <${oAuthEmail}>`,
			to,
			subject,
			text,
		})

		console.log('Email sent successfully: %s', info.messageId)
	} catch (error) {
		console.error('ERROR sending email:', error)

		throw error
	}
}
