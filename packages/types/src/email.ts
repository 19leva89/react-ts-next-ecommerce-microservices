/**
 * Interface for the user creation message.
 * Used in the 'user.created' topic.
 */
export interface UserCreatedMessage {
	email: string
	username: string
}

/**
 * Interface for the order creation message.
 * Used in the 'order.created' topic.
 */
export interface OrderCreatedMessage {
	email: string
	amount: number // Assumed to be in cents (as in the example with /100)
	status: string
}

/**
 * Common interface for messages related to email sending.
 * All message types must include an email.
 */
export interface EmailMessage {
	email: string
}
