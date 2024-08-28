# Shopify WeAreOpen App

## Overview

The **Shopify WeAreOpen App** is designed to enhance the functionality of your Shopify store by restricting the ability to place orders based on the opening hours you define within the app. This is particularly useful for local businesses, such as restaurants, that need to control when customers can place orders based on their operating hours.

![img](weareopen.jpg)

## Key Features

- **Customizable Opening Hours**: Define specific opening hours for each day of the week (e.g., Monday-Saturday, 09:00-21:00). 
- **Automatic Store Closure Notifications**: When your store is outside of the set operating hours, a banner will automatically inform customers that the store is closed.
- **Browsing Without Ordering**: Even when the store is closed for orders, customers can still browse products, allowing them to plan their purchases ahead of time.
- **Ideal for Local Businesses**: This app is perfect for local businesses such as restaurants, cafes, or any service that relies on specific operating hours for order fulfillment.

## How It Works

1. **Setting Up Opening Hours**: Use the app to easily configure the opening hours for your store by selecting the days and times you are open for business.

2. **Customer Experience**:
   - When customers visit your store outside of the set opening hours, a banner will notify them that the store is currently closed for orders.
   - Customers can continue to browse your products and add items to their cart, but they will not be able to complete the purchase until the store is within operating hours.

3. **Seamless Integration**: The app integrates smoothly with your Shopify store, ensuring that the shopping experience is consistent and professional.

## Installation

To install and configure the **Shopify Opening Hours Restriction App**, follow these steps:

1. **Install the App**: Download and install the app from the Shopify App Store or your internal repository.
2. **Configure Opening Hours**: Navigate to the app settings and set your desired opening hours for each day of the week.
3. **Activate the Banner**: Ensure the banner notification is enabled so that customers are informed when the store is closed for orders.

## Use Case Example

Imagine running a local restaurant that delivers food only during specific hours. With this app, you can:
- Set your restaurant’s delivery hours (e.g., Monday-Saturday, 09:00-21:00).
- Outside these hours, customers visiting your online store will see a banner indicating that orders cannot be placed at the moment, but they can still explore your menu and plan their orders for later.

This functionality helps you manage customer expectations while maintaining the convenience of an online storefront.

## Support

For any questions or issues, please contact our support team at [support@example.com](mailto:support@example.com).

---

**Note**: This app is designed to work seamlessly with Shopify, requiring no additional configuration beyond setting your opening hours.



## Installation

Using the [Shopify CLI](https://github.com/Shopify/shopify-cli) run:

```sh
~/ $ shopify node create -n APP_NAME
```

Or, fork and clone repo

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- In the Partner dashboard, [create a new app](https://help.shopify.com/en/api/tools/partner-dashboard/your-apps#create-a-new-app). You’ll need this app’s API credentials during the setup process.

## Usage

This repository is used by [Shopify CLI](https://github.com/Shopify/shopify-cli) as a scaffold for Node apps. You can clone or fork it yourself, but it’s faster and easier to use Shopify App CLI, which handles additional routine development tasks for you.

## License

This respository is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
