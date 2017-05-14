# vfinvoicedownloader

Download invoices from Vodafone/Kabel Deutschland automatically using web automation. This will not work with mobile contracts.

This script is heavily influced by [kabelschland](https://github.com/rmoriz/kabelschland) by rmoriz

## prerequisites

This only worls on mac os.

The scripts checks your keychain for an entry named `Vodafone` in order to get username and password.

To create a new item open `Keychain Access` and hit ⌘+N, create a new login with your Vodafone credentials.

When running the script for the first time, you will be prompted for permissions accessing your keychain.
