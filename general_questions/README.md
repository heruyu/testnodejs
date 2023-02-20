# General questions

1. How do Promises work?

   They allow for the async functions to return a value the way sync functions do. We can compare them to promises in real life, they represent the status of an async operations. Pending, rejected or fulfilled. We promise to do something (pending), we succeed (fulfilled) or we fail (rejected).

2. What kind of scopes are in Javascript? What are the differences between them?

   Global, Local and Block scope, global variable can be used throughout the whole program, local only inside the function where it was defined and block only in where it was defined (inside if statement for example)

3. What is type coercion and when is it used?

   Coercion is an automatic conversion of the value from one type (primitive ones) of data type to another. We would use it (more so javascript would do that) for example to: compare values or create expressions but one of the arguments is a string.

4. Explain the difference between passing argument as a value and as a reference.

   When we pass an argument as a value, the changes we make on the value don't affect the original. As to when we pass the argument as a reference, we work on the original.

5. What are the local storage, session storage and cookies used for?

   Basically used for storing data on clients side (saving user specific settings, already filled out fields in forms etc.) to minimize the network usage and speed up the site. Cookies are used to save personal setting on the site, Session storage keeps the data until the browser is closed and Local keeps the data even after the browser is closed

6. What are the key differences between regular and arrow functions?

   1. we can only call the arrow functions, no constructors (reqular can both)
   2. arrow functions don't have their own _this_ (they always go back to the closest parent function - non-arrow function)

7. When would you use destructuring assignment?

   To get multiple values/properties from function result (eg. value, error) , arrays or items at the same time.

8. What is optional chaining useful for?

   When there is a possibility the value we try to access is null or undefined, and we want to check if the value exists before going to the next one. It prevents from errors when the value is null/undefined, returns an undefined.

9. Explain why following code does not work as one would expect it to. How would you fix it?

   Reasoning for the error:

   - the presented code got the **getId** from class via destructuring, as of why it did not work. We did not have the access to the **lastId** variable so we couldn’t call the **getId**.

     ```javascript
     class IdGenerator {
       lastId = 0;
       getId() {
         return this.lastId++;
       }
     }
     const { getId } = new IdGenerator();
     const people = ["Tom", "Kate", "Taylor"].map((name) => ({
       name,
       id: getId(),
     }));
     ```

   Fixed:

   - I have changed the const declaration to just be an object of **IdGenerator** class so I can call upon the getId method. (I have kept **getId** name of variable for the sake of consistency, but it can be called whatever)

     ```javascript
     class IdGenerator {
       lastId = 0;
       getId() {
         return this.lastId++;
       }
     }
     const getId = new IdGenerator();
     const people = ["Tom", "Kate", "Taylor"].map((name) => ({
       name,
       id: getId.getId(),
     }));
     ```

10. Explain the difference:

    ```javascript
    const a: string = "hello";
    const a = "hello" as string;
    ```

    1. type annotation, it’s not needed, because it will be assumed as string regardless

    2. type assertion, it will not allow for impossible coercions, you can’t do, for example

       ```javascript
       const a = "hello" as number
       ```
