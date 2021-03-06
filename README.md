# Techizer
Techizer is an ecommerce web application where you can search and buy tech-related products.

## Features
- Authentication
  - Login
  - Registration
  - Password reset
  - Account activation
  - Logout
- Products
  - Search
  - Filtering
  - Pagination
  - Sorting
  - Reviews
- Cart
  - Add to cart
  - Edit cart
  - Remove from cart
  - Cart sidebar
- Checkout
  - Add shipping addresses
  - Select payment method
  - Order summary
  - Paypal integration
- Dashboard
  - Edit profile
  - Order list
  - Order details and status
- Admin
  - User list
  - Edit users
  - Delete users
  - Order list
  - Update orders
  - Product list
  - Create product
  - Edit product
  - Delete product
  
  The admin page is restricted to admin users only, here are some images of the different features
  
  ### User list
  ![Users](https://techizer-bucket.s3.us-east-1.amazonaws.com/files/users.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMSJGMEQCIGaGgcJikN152ESg1RycnM%2Bt7ukjj%2FhEwOMSEF2ucwY1AiAECTQ0sTI%2Fg9asAmx%2F8nQ90ot5oHNDd1IR8Gp7smWTbSrkAggxEAEaDDkyMjkwNzI4NTk3OCIM2AQBC4vanReFXlhbKsECrF6pTZ%2BiIkN9dRsH2I2J7jYzETv1kv0kjfO%2BYLfd2i7DNGlETK0ttlR1a%2Bbwu9e%2BNKmW%2BcGAz4aXIAr%2F85lk42y7qxOYhENyBJPqPMk92ccNUJobpydJtJyuXMh5TMkkEfHxygQ8DwpcMz46hFpaksHU3vttkJLiy%2FizWBRi1EYDJdvxnH4pCvSMieOz6yRMmni6ZTJAXxOlXzjpV1qk36y3cUEcgkFRPApud4nbWdKqKTKGg2R7bMPX2jxeFzsIWxUBDp9UHO6rR5uf4OY9iFMzz33qmreOW6wcgub1V4zcfYXocbv3k7NWFN0k1Wz2SJkMJHFpR2fsjiFGGqlsM9BzPe0Eh9TDXIopyJ3pAFR6A15ykOjMRXGftoEpxsmn%2Bdxl8utkN2rUC3XT1xM0oxTcOXZ5sXOy18XEiU96uztYMPzC9o4GOrQCyS9oapzjkuuF3nYuH%2BzOsB4GRcJ%2BtZFkJneQb73Ai1DgHfqvo8StbQKrGtCYG5xGTq5aoyZ8lWX9YQa1IHloxAYMv77qLaQx6XLmcF%2Fzx9n7ND5YmGpczBiAp9XBXbNLxT0OPc3eZtgQhkNyD%2Bm1Ltr%2FKciRuRdrWoaLWOwdOV7mKhEEXBkmU3WFslc5FMY%2FHGiHuUjfbeCoEsJnL0C1j3bJ8laAUPTpHlrgbOQgFbyW4gS7ZA2AZmK6fI7p%2FSFHSmaEuTfHPlH20Q1tQ5ieiZho3nyXVzvnV0iaYxiHX71aMkVxFgQ4ovoqSCBTSCL62ChJRB90Tt7l6nouQxDVfdkMl6HZjHtb5j1%2FJVllhJqzd1BM72WLmoBlELHLJaOjYpJKGwK9YgjqGZqM2F3u6GRqXQo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220111T153505Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5NYMPTHNB6UAXSMF%2F20220111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=87080d9eae6be0970819b3908e2351834fcb6e4f56f6907e3da8811d78e694e0)
  
  ### Edit user
  ![Edit user](https://techizer-bucket.s3.us-east-1.amazonaws.com/files/eidt_user.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMSJGMEQCIGaGgcJikN152ESg1RycnM%2Bt7ukjj%2FhEwOMSEF2ucwY1AiAECTQ0sTI%2Fg9asAmx%2F8nQ90ot5oHNDd1IR8Gp7smWTbSrkAggxEAEaDDkyMjkwNzI4NTk3OCIM2AQBC4vanReFXlhbKsECrF6pTZ%2BiIkN9dRsH2I2J7jYzETv1kv0kjfO%2BYLfd2i7DNGlETK0ttlR1a%2Bbwu9e%2BNKmW%2BcGAz4aXIAr%2F85lk42y7qxOYhENyBJPqPMk92ccNUJobpydJtJyuXMh5TMkkEfHxygQ8DwpcMz46hFpaksHU3vttkJLiy%2FizWBRi1EYDJdvxnH4pCvSMieOz6yRMmni6ZTJAXxOlXzjpV1qk36y3cUEcgkFRPApud4nbWdKqKTKGg2R7bMPX2jxeFzsIWxUBDp9UHO6rR5uf4OY9iFMzz33qmreOW6wcgub1V4zcfYXocbv3k7NWFN0k1Wz2SJkMJHFpR2fsjiFGGqlsM9BzPe0Eh9TDXIopyJ3pAFR6A15ykOjMRXGftoEpxsmn%2Bdxl8utkN2rUC3XT1xM0oxTcOXZ5sXOy18XEiU96uztYMPzC9o4GOrQCyS9oapzjkuuF3nYuH%2BzOsB4GRcJ%2BtZFkJneQb73Ai1DgHfqvo8StbQKrGtCYG5xGTq5aoyZ8lWX9YQa1IHloxAYMv77qLaQx6XLmcF%2Fzx9n7ND5YmGpczBiAp9XBXbNLxT0OPc3eZtgQhkNyD%2Bm1Ltr%2FKciRuRdrWoaLWOwdOV7mKhEEXBkmU3WFslc5FMY%2FHGiHuUjfbeCoEsJnL0C1j3bJ8laAUPTpHlrgbOQgFbyW4gS7ZA2AZmK6fI7p%2FSFHSmaEuTfHPlH20Q1tQ5ieiZho3nyXVzvnV0iaYxiHX71aMkVxFgQ4ovoqSCBTSCL62ChJRB90Tt7l6nouQxDVfdkMl6HZjHtb5j1%2FJVllhJqzd1BM72WLmoBlELHLJaOjYpJKGwK9YgjqGZqM2F3u6GRqXQo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220111T153549Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5NYMPTHNB6UAXSMF%2F20220111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1bcab61c4c8c15faa77d7924b8193f1b66006b310fcebbcea6e1c0f22c8bacb3)
  
  ### Order list
  ![Order list](https://techizer-bucket.s3.us-east-1.amazonaws.com/files/order_list.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMSJGMEQCIGaGgcJikN152ESg1RycnM%2Bt7ukjj%2FhEwOMSEF2ucwY1AiAECTQ0sTI%2Fg9asAmx%2F8nQ90ot5oHNDd1IR8Gp7smWTbSrkAggxEAEaDDkyMjkwNzI4NTk3OCIM2AQBC4vanReFXlhbKsECrF6pTZ%2BiIkN9dRsH2I2J7jYzETv1kv0kjfO%2BYLfd2i7DNGlETK0ttlR1a%2Bbwu9e%2BNKmW%2BcGAz4aXIAr%2F85lk42y7qxOYhENyBJPqPMk92ccNUJobpydJtJyuXMh5TMkkEfHxygQ8DwpcMz46hFpaksHU3vttkJLiy%2FizWBRi1EYDJdvxnH4pCvSMieOz6yRMmni6ZTJAXxOlXzjpV1qk36y3cUEcgkFRPApud4nbWdKqKTKGg2R7bMPX2jxeFzsIWxUBDp9UHO6rR5uf4OY9iFMzz33qmreOW6wcgub1V4zcfYXocbv3k7NWFN0k1Wz2SJkMJHFpR2fsjiFGGqlsM9BzPe0Eh9TDXIopyJ3pAFR6A15ykOjMRXGftoEpxsmn%2Bdxl8utkN2rUC3XT1xM0oxTcOXZ5sXOy18XEiU96uztYMPzC9o4GOrQCyS9oapzjkuuF3nYuH%2BzOsB4GRcJ%2BtZFkJneQb73Ai1DgHfqvo8StbQKrGtCYG5xGTq5aoyZ8lWX9YQa1IHloxAYMv77qLaQx6XLmcF%2Fzx9n7ND5YmGpczBiAp9XBXbNLxT0OPc3eZtgQhkNyD%2Bm1Ltr%2FKciRuRdrWoaLWOwdOV7mKhEEXBkmU3WFslc5FMY%2FHGiHuUjfbeCoEsJnL0C1j3bJ8laAUPTpHlrgbOQgFbyW4gS7ZA2AZmK6fI7p%2FSFHSmaEuTfHPlH20Q1tQ5ieiZho3nyXVzvnV0iaYxiHX71aMkVxFgQ4ovoqSCBTSCL62ChJRB90Tt7l6nouQxDVfdkMl6HZjHtb5j1%2FJVllhJqzd1BM72WLmoBlELHLJaOjYpJKGwK9YgjqGZqM2F3u6GRqXQo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220111T153611Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5NYMPTHNB6UAXSMF%2F20220111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9e5d61e6ab7b506326c01a0ef5fe6f0f78c5e08b321db855474e60b5eb03e166)
  
  ### Update order
  ![Update order](https://techizer-bucket.s3.us-east-1.amazonaws.com/files/order_details.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMSJGMEQCIGaGgcJikN152ESg1RycnM%2Bt7ukjj%2FhEwOMSEF2ucwY1AiAECTQ0sTI%2Fg9asAmx%2F8nQ90ot5oHNDd1IR8Gp7smWTbSrkAggxEAEaDDkyMjkwNzI4NTk3OCIM2AQBC4vanReFXlhbKsECrF6pTZ%2BiIkN9dRsH2I2J7jYzETv1kv0kjfO%2BYLfd2i7DNGlETK0ttlR1a%2Bbwu9e%2BNKmW%2BcGAz4aXIAr%2F85lk42y7qxOYhENyBJPqPMk92ccNUJobpydJtJyuXMh5TMkkEfHxygQ8DwpcMz46hFpaksHU3vttkJLiy%2FizWBRi1EYDJdvxnH4pCvSMieOz6yRMmni6ZTJAXxOlXzjpV1qk36y3cUEcgkFRPApud4nbWdKqKTKGg2R7bMPX2jxeFzsIWxUBDp9UHO6rR5uf4OY9iFMzz33qmreOW6wcgub1V4zcfYXocbv3k7NWFN0k1Wz2SJkMJHFpR2fsjiFGGqlsM9BzPe0Eh9TDXIopyJ3pAFR6A15ykOjMRXGftoEpxsmn%2Bdxl8utkN2rUC3XT1xM0oxTcOXZ5sXOy18XEiU96uztYMPzC9o4GOrQCyS9oapzjkuuF3nYuH%2BzOsB4GRcJ%2BtZFkJneQb73Ai1DgHfqvo8StbQKrGtCYG5xGTq5aoyZ8lWX9YQa1IHloxAYMv77qLaQx6XLmcF%2Fzx9n7ND5YmGpczBiAp9XBXbNLxT0OPc3eZtgQhkNyD%2Bm1Ltr%2FKciRuRdrWoaLWOwdOV7mKhEEXBkmU3WFslc5FMY%2FHGiHuUjfbeCoEsJnL0C1j3bJ8laAUPTpHlrgbOQgFbyW4gS7ZA2AZmK6fI7p%2FSFHSmaEuTfHPlH20Q1tQ5ieiZho3nyXVzvnV0iaYxiHX71aMkVxFgQ4ovoqSCBTSCL62ChJRB90Tt7l6nouQxDVfdkMl6HZjHtb5j1%2FJVllhJqzd1BM72WLmoBlELHLJaOjYpJKGwK9YgjqGZqM2F3u6GRqXQo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220111T153637Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5NYMPTHNB6UAXSMF%2F20220111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=c6df2a5307fabd2edc345d765927083786cf03be8b45b6d000a2279a95a745c5)
  
  ### Product list
  ![Product list](https://techizer-bucket.s3.us-east-1.amazonaws.com/files/product_list.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMSJGMEQCIGaGgcJikN152ESg1RycnM%2Bt7ukjj%2FhEwOMSEF2ucwY1AiAECTQ0sTI%2Fg9asAmx%2F8nQ90ot5oHNDd1IR8Gp7smWTbSrkAggxEAEaDDkyMjkwNzI4NTk3OCIM2AQBC4vanReFXlhbKsECrF6pTZ%2BiIkN9dRsH2I2J7jYzETv1kv0kjfO%2BYLfd2i7DNGlETK0ttlR1a%2Bbwu9e%2BNKmW%2BcGAz4aXIAr%2F85lk42y7qxOYhENyBJPqPMk92ccNUJobpydJtJyuXMh5TMkkEfHxygQ8DwpcMz46hFpaksHU3vttkJLiy%2FizWBRi1EYDJdvxnH4pCvSMieOz6yRMmni6ZTJAXxOlXzjpV1qk36y3cUEcgkFRPApud4nbWdKqKTKGg2R7bMPX2jxeFzsIWxUBDp9UHO6rR5uf4OY9iFMzz33qmreOW6wcgub1V4zcfYXocbv3k7NWFN0k1Wz2SJkMJHFpR2fsjiFGGqlsM9BzPe0Eh9TDXIopyJ3pAFR6A15ykOjMRXGftoEpxsmn%2Bdxl8utkN2rUC3XT1xM0oxTcOXZ5sXOy18XEiU96uztYMPzC9o4GOrQCyS9oapzjkuuF3nYuH%2BzOsB4GRcJ%2BtZFkJneQb73Ai1DgHfqvo8StbQKrGtCYG5xGTq5aoyZ8lWX9YQa1IHloxAYMv77qLaQx6XLmcF%2Fzx9n7ND5YmGpczBiAp9XBXbNLxT0OPc3eZtgQhkNyD%2Bm1Ltr%2FKciRuRdrWoaLWOwdOV7mKhEEXBkmU3WFslc5FMY%2FHGiHuUjfbeCoEsJnL0C1j3bJ8laAUPTpHlrgbOQgFbyW4gS7ZA2AZmK6fI7p%2FSFHSmaEuTfHPlH20Q1tQ5ieiZho3nyXVzvnV0iaYxiHX71aMkVxFgQ4ovoqSCBTSCL62ChJRB90Tt7l6nouQxDVfdkMl6HZjHtb5j1%2FJVllhJqzd1BM72WLmoBlELHLJaOjYpJKGwK9YgjqGZqM2F3u6GRqXQo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220111T153706Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5NYMPTHNB6UAXSMF%2F20220111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=1e52e1c2bf1aed0fd6fcc59da77b80fa5a99bbdd1bc107b0eae91935c405fed3)
  
  ### Create product
  ![Create product](https://techizer-bucket.s3.us-east-1.amazonaws.com/files/add_product.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMSJGMEQCIGaGgcJikN152ESg1RycnM%2Bt7ukjj%2FhEwOMSEF2ucwY1AiAECTQ0sTI%2Fg9asAmx%2F8nQ90ot5oHNDd1IR8Gp7smWTbSrkAggxEAEaDDkyMjkwNzI4NTk3OCIM2AQBC4vanReFXlhbKsECrF6pTZ%2BiIkN9dRsH2I2J7jYzETv1kv0kjfO%2BYLfd2i7DNGlETK0ttlR1a%2Bbwu9e%2BNKmW%2BcGAz4aXIAr%2F85lk42y7qxOYhENyBJPqPMk92ccNUJobpydJtJyuXMh5TMkkEfHxygQ8DwpcMz46hFpaksHU3vttkJLiy%2FizWBRi1EYDJdvxnH4pCvSMieOz6yRMmni6ZTJAXxOlXzjpV1qk36y3cUEcgkFRPApud4nbWdKqKTKGg2R7bMPX2jxeFzsIWxUBDp9UHO6rR5uf4OY9iFMzz33qmreOW6wcgub1V4zcfYXocbv3k7NWFN0k1Wz2SJkMJHFpR2fsjiFGGqlsM9BzPe0Eh9TDXIopyJ3pAFR6A15ykOjMRXGftoEpxsmn%2Bdxl8utkN2rUC3XT1xM0oxTcOXZ5sXOy18XEiU96uztYMPzC9o4GOrQCyS9oapzjkuuF3nYuH%2BzOsB4GRcJ%2BtZFkJneQb73Ai1DgHfqvo8StbQKrGtCYG5xGTq5aoyZ8lWX9YQa1IHloxAYMv77qLaQx6XLmcF%2Fzx9n7ND5YmGpczBiAp9XBXbNLxT0OPc3eZtgQhkNyD%2Bm1Ltr%2FKciRuRdrWoaLWOwdOV7mKhEEXBkmU3WFslc5FMY%2FHGiHuUjfbeCoEsJnL0C1j3bJ8laAUPTpHlrgbOQgFbyW4gS7ZA2AZmK6fI7p%2FSFHSmaEuTfHPlH20Q1tQ5ieiZho3nyXVzvnV0iaYxiHX71aMkVxFgQ4ovoqSCBTSCL62ChJRB90Tt7l6nouQxDVfdkMl6HZjHtb5j1%2FJVllhJqzd1BM72WLmoBlELHLJaOjYpJKGwK9YgjqGZqM2F3u6GRqXQo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220111T153416Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5NYMPTHNB6UAXSMF%2F20220111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=bf64d145c0fd29664b65c65a5b235be26ab0e5621262e6860b9bb0931789fc37)
  
  ### Edit product
  ![Edit product](https://techizer-bucket.s3.us-east-1.amazonaws.com/files/edit_product.PNG?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBgaCXVzLXdlc3QtMSJGMEQCIGaGgcJikN152ESg1RycnM%2Bt7ukjj%2FhEwOMSEF2ucwY1AiAECTQ0sTI%2Fg9asAmx%2F8nQ90ot5oHNDd1IR8Gp7smWTbSrkAggxEAEaDDkyMjkwNzI4NTk3OCIM2AQBC4vanReFXlhbKsECrF6pTZ%2BiIkN9dRsH2I2J7jYzETv1kv0kjfO%2BYLfd2i7DNGlETK0ttlR1a%2Bbwu9e%2BNKmW%2BcGAz4aXIAr%2F85lk42y7qxOYhENyBJPqPMk92ccNUJobpydJtJyuXMh5TMkkEfHxygQ8DwpcMz46hFpaksHU3vttkJLiy%2FizWBRi1EYDJdvxnH4pCvSMieOz6yRMmni6ZTJAXxOlXzjpV1qk36y3cUEcgkFRPApud4nbWdKqKTKGg2R7bMPX2jxeFzsIWxUBDp9UHO6rR5uf4OY9iFMzz33qmreOW6wcgub1V4zcfYXocbv3k7NWFN0k1Wz2SJkMJHFpR2fsjiFGGqlsM9BzPe0Eh9TDXIopyJ3pAFR6A15ykOjMRXGftoEpxsmn%2Bdxl8utkN2rUC3XT1xM0oxTcOXZ5sXOy18XEiU96uztYMPzC9o4GOrQCyS9oapzjkuuF3nYuH%2BzOsB4GRcJ%2BtZFkJneQb73Ai1DgHfqvo8StbQKrGtCYG5xGTq5aoyZ8lWX9YQa1IHloxAYMv77qLaQx6XLmcF%2Fzx9n7ND5YmGpczBiAp9XBXbNLxT0OPc3eZtgQhkNyD%2Bm1Ltr%2FKciRuRdrWoaLWOwdOV7mKhEEXBkmU3WFslc5FMY%2FHGiHuUjfbeCoEsJnL0C1j3bJ8laAUPTpHlrgbOQgFbyW4gS7ZA2AZmK6fI7p%2FSFHSmaEuTfHPlH20Q1tQ5ieiZho3nyXVzvnV0iaYxiHX71aMkVxFgQ4ovoqSCBTSCL62ChJRB90Tt7l6nouQxDVfdkMl6HZjHtb5j1%2FJVllhJqzd1BM72WLmoBlELHLJaOjYpJKGwK9YgjqGZqM2F3u6GRqXQo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220111T153733Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA5NYMPTHNB6UAXSMF%2F20220111%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=b46f90e78b5a67ca03a956fde1c226ebe84d29b1f5233fe452d00bba8819e5aa)
  
  ## Technologies
  For the backend I used the Django framework, and for building the API I used the Django REST Framework. I used Simple JWT to handle user authentication. For the frontend I used React JS and the React Router, with the help of the Context API to manage state.
  
  [Live website](https://techizer.herokuapp.com/)
