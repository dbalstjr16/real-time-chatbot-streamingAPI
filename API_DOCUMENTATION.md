# CS272 S25 AI API Documentation

## AI Completions

Used to generate a response using GPT-4o Mini. **You are responsible for all traffic coming from your `X-CS571-ID`.** Failing to include a valid `X-CS571-ID` will result in a `401`.

### `/completions` 

#### Request

`POST` `https://cs571api.cs.wisc.edu/rest/s25/hw11/completions`

You must request an AI completion with a list of message objects, each containing a valid `role` ("developer", "assistant", or "user") and corresponding `content` as well as a valid set of headers specified below.

##### Request Body
```json
[
    {
        "role": "assistant",
        "content": "Welcome to BadgerChatGPT! Ask me anything."
    },
    {
        "role": "user",
        "content": "hey how are you"
    }
]
```

##### Request Headers
```json
{
    "Content-Type": "application/json",
    "X-CS571-ID": "ENTER_YOUR_BID"
}
```

#### Response

If the request is successful, a `200` will be sent containing a `msg` with the AI's response...
```json
{
    "msg": "I'm just a program, but I'm here and ready to help! How about you? What’s on your mind?"
}
```

If your list of objects is malformed, the following `400` will be sent...

```json
{
    "msg": "The request body does not contain a valid list of chat objects."
}
```

If your request is too long, the following `413` will be sent...

```json
{
    "msg": "The request body is too long for the given context window."
}
```

If you make too many requests in a short period of time, the following `429` will be sent...

```json
{
    "msg": "Too many requests, please try again later."
}
```

### `/completions-stream` 

`POST` `https://cs571api.cs.wisc.edu/rest/s25/hw11/completions`


*The request is the same for `/completions` and `/completions-stream`; the response differs.*

You must request an AI completion with a list of message objects, each containing a valid `role` ("developer", "assistant", or "user") and corresponding `content` as well as a valid set of headers specified below.

#### Request

##### Request Body
```json
[
    {
        "role": "assistant",
        "content": "Welcome to BadgerChatGPT! Ask me anything."
    },
    {
        "role": "user",
        "content": "hey how are you"
    }
]
```

##### Request Headers
```json
{
    "Content-Type": "application/json",
    "X-CS571-ID": "ENTER_YOUR_BID"
}
```

#### Response

If the request is successful, a `200` will be sent *as a [stream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) of responses*. containing a `delta` since the last streamed message...
```json
{"delta":""}
{"delta":""}
{"delta":"I'm"}
{"delta":" just a"}
{"delta":" program,"}
{"delta":" so"}
{"delta":" I don't"}
{"delta":" have"}
{"delta":" feelings"}
{"delta":","}
{"delta":" but"}
{"delta":" I'm here"}
{"delta":" and ready"}
{"delta":" to help you! How about you"}
{"delta":"?"}
{"delta":""}
```

These responses are chunked with 0-or-more JS response objects per chunk, seperated by new line characters. For example, the above may be streamed as the following chunks...

```json
{"delta":""}
{"delta":""}
```

```json
{"delta":"I'm"}
```

```json
{"delta":" just a"}
{"delta":" program,"}
```

```json
{"delta":" so"}
```

```json
{"delta":" I don't"}
```

```json
{"delta":" have"}
```

```json
{"delta":" feelings"}
{"delta":","}
{"delta":" but"}
```

```json
{"delta":" I'm here"}
{"delta":" and ready"}
```

```json
{"delta":" to help you! How about you"}
{"delta":"?"}
{"delta":""}
```

If your list of objects is malformed, the following `400` will be sent...

```json
{
    "msg": "The request body does not contain a valid list of chat objects."
}
```

If your request is too long, the following `413` will be sent...

```json
{
    "msg": "The request body is too long for the given context window."
}
```

If you make too many requests in a short period of time, the following `429` will be sent...

```json
{
    "msg": "Too many requests, please try again later."
}
```
