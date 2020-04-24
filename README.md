# Rock Check-in RPC Client

This is a client script for communicating between check-in applications and kiosk apps using JSON RPC. Currently it only supports Web Messaging, but it may be expanded with support for other transport mechanisms such as Websockets in the future.

## Usage

If you're creating a web application, you can use this as a library to interface with any of our kiosk applications.

```html
<script src="checkin-rpc.js">
<script>
    // Create a new client
    const client = new CheckinRpcClient({
        connection: "webmessage",
        shim: false
    });

    // Use it to print a label, get app settings, etc
    client.printLabel(/* ... Label Data ... */);
</script>
```

## Client Config

### `connection`
String, Required

The connection to use for rpc communication, can be one of:

- `"webmessage"` - Uses the Web Messaging API to communicate with the host application.

### `shim`
Boolean, Optional, Default: `false`

Enables the shim for the built-in checkin website.

## Shimming the Core Check-In Website

To allow the built-in Rock check-in website to print to our clients, add the rpc client to the site as a shim:

```html
<script defer src="checkin-rpc.js">
<script id="checkin-rpc-init" type="application/json">
    {
        "connection": "webmessage",
        "shim": true
    }
</script>
```
