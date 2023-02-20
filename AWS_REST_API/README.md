# POST and GET methods

1. POST

   url: https://522udvuqu4.execute-api.eu-north-1.amazonaws.com/test/

   Example body:

   - valid

     ```json
     {
       "name": "Valid",
       "age": 22
     }
     ```

   - invalid

     ```json
     {
       "name": "Invalid",
       "age": "1c"
     }
     ```

2. GET

   the POST response will provide _user_id_, so please copy and replace the _{user_id}_ placeholder in the url below:

   url: https://522udvuqu4.execute-api.eu-north-1.amazonaws.com/test/{user_id}
