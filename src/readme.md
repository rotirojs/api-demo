#Api Definitions

Api schemas can be created and shared between multiple apps or just defined within 
your apps project.

This configuration demonstrates how the same api schema can be used to build a 
standard express api and an api gateway on AWS vai claudia.js

When sharing the same api definitions between multiple applications/projects it 
is better to either package the definitions in a module and import them or use
a mono repo solution such as lerna.
