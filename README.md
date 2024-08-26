# this is for testing Api

## change for env
now .env have to change for your id, so don't do mine, it will be so wrong. You can get this from Line Api message.
For mongoDB, you know what to do.
*  ACCESS_TOKEN, and SECRET_TOKEN from line api
*  MONGODB_URI from mongoDB

## for webhook
since I used ngork, it will generate new protocol, if you want to make it fixed, you have to pay.
We have to use 2 ports for webhook and server 

```
tunnels:
  first-app:
    addr: 4000
    proto: http
  second-app:
    addr: 5001
    proto: http
```
Since we don't pay money, we have to config in ngrok.yaml for making to 2 port addresses

and also change path in index.js and webhook http in line api

## for dependencies

```
npm i
```

