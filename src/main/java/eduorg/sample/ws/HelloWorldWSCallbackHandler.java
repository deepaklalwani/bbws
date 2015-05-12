
/**
 * HelloWorldWSCallbackHandler.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis2 version: 1.5.1  Built on : Oct 19, 2009 (10:59:00 EDT)
 */

    package sample.ws;

    /**
     *  HelloWorldWSCallbackHandler Callback class, Users can extend this class and implement
     *  their own receiveResult and receiveError methods.
     */
    public abstract class HelloWorldWSCallbackHandler{



    protected Object clientData;

    /**
    * User can pass in any object that needs to be accessed once the NonBlocking
    * Web service call is finished and appropriate method of this CallBack is called.
    * @param clientData Object mechanism by which the user can pass in user data
    * that will be avilable at the time this callback is called.
    */
    public HelloWorldWSCallbackHandler(Object clientData){
        this.clientData = clientData;
    }

    /**
    * Please use this constructor if you don't want to set any clientData
    */
    public HelloWorldWSCallbackHandler(){
        this.clientData = null;
    }

    /**
     * Get the client data
     */

     public Object getClientData() {
        return clientData;
     }

        
           /**
            * auto generated Axis2 call back method for getServerVersion method
            * override this method for handling normal response from getServerVersion operation
            */
           public void receiveResultgetServerVersion(
                    sample.ws.HelloWorldWSStub.GetServerVersionResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from getServerVersion operation
           */
            public void receiveErrorgetServerVersion(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for helloAuthenticatedWithEntitlementPrecheck method
            * override this method for handling normal response from helloAuthenticatedWithEntitlementPrecheck operation
            */
           public void receiveResulthelloAuthenticatedWithEntitlementPrecheck(
                    sample.ws.HelloWorldWSStub.HelloAuthenticatedWithEntitlementPrecheckResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from helloAuthenticatedWithEntitlementPrecheck operation
           */
            public void receiveErrorhelloAuthenticatedWithEntitlementPrecheck(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for hello method
            * override this method for handling normal response from hello operation
            */
           public void receiveResulthello(
                    sample.ws.HelloWorldWSStub.HelloResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from hello operation
           */
            public void receiveErrorhello(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for helloAuthenticatedWithEntitlements method
            * override this method for handling normal response from helloAuthenticatedWithEntitlements operation
            */
           public void receiveResulthelloAuthenticatedWithEntitlements(
                    sample.ws.HelloWorldWSStub.HelloAuthenticatedWithEntitlementsResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from helloAuthenticatedWithEntitlements operation
           */
            public void receiveErrorhelloAuthenticatedWithEntitlements(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for helloAuthenticated method
            * override this method for handling normal response from helloAuthenticated operation
            */
           public void receiveResulthelloAuthenticated(
                    sample.ws.HelloWorldWSStub.HelloAuthenticatedResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from helloAuthenticated operation
           */
            public void receiveErrorhelloAuthenticated(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for initializeHelloWorldWS method
            * override this method for handling normal response from initializeHelloWorldWS operation
            */
           public void receiveResultinitializeHelloWorldWS(
                    sample.ws.HelloWorldWSStub.InitializeHelloWorldWSResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from initializeHelloWorldWS operation
           */
            public void receiveErrorinitializeHelloWorldWS(java.lang.Exception e) {
            }
                


    }
    