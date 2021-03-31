# api-demo

The api demo repo creates fake api defined using rotiro. It's designed to 
demonstrate the basic configuration behind binding a schema to services and 
should work in different environments.

You can add the module to an existing project using:

```yarn add rotirojs/api-demo```

This repo is a demonstration of how you can create one fully working api that can then be run on express, api gateway and more in the future

The benefit of this approach is that you do not need to decide where or how your api should be deployed.

A great use case for this may be when developing you would run the api locally with express whereas the production code may run on the AWS Api Gateway/lambdas which is not easy to test and requires continual deployments 

### Demos
The [Rotiro demos project](https://github.com/rotirojs/rotiro-demos) has examples
that demonstrate how to consume this api
