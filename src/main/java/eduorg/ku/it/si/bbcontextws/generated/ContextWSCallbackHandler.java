
/**
 * ContextWSCallbackHandler.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis2 version: 1.5.1  Built on : Oct 19, 2009 (10:59:00 EDT)
 */

    package edu.ku.it.si.bbcontextws.generated;

    /**
     *  ContextWSCallbackHandler Callback class, Users can extend this class and implement
     *  their own receiveResult and receiveError methods.
     */
    public abstract class ContextWSCallbackHandler{



    protected Object clientData;

    /**
    * User can pass in any object that needs to be accessed once the NonBlocking
    * Web service call is finished and appropriate method of this CallBack is called.
    * @param clientData Object mechanism by which the user can pass in user data
    * that will be avilable at the time this callback is called.
    */
    public ContextWSCallbackHandler(Object clientData){
        this.clientData = clientData;
    }

    /**
    * Please use this constructor if you don't want to set any clientData
    */
    public ContextWSCallbackHandler(){
        this.clientData = null;
    }

    /**
     * Get the client data
     */

     public Object getClientData() {
        return clientData;
     }

        
           /**
            * auto generated Axis2 call back method for getMyMemberships method
            * override this method for handling normal response from getMyMemberships operation
            */
           public void receiveResultgetMyMemberships(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.GetMyMembershipsResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from getMyMemberships operation
           */
            public void receiveErrorgetMyMemberships(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for extendSessionLife method
            * override this method for handling normal response from extendSessionLife operation
            */
           public void receiveResultextendSessionLife(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.ExtendSessionLifeResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from extendSessionLife operation
           */
            public void receiveErrorextendSessionLife(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for getSystemInstallationId method
            * override this method for handling normal response from getSystemInstallationId operation
            */
           public void receiveResultgetSystemInstallationId(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.GetSystemInstallationIdResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from getSystemInstallationId operation
           */
            public void receiveErrorgetSystemInstallationId(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for getServerVersion method
            * override this method for handling normal response from getServerVersion operation
            */
           public void receiveResultgetServerVersion(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.GetServerVersionResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from getServerVersion operation
           */
            public void receiveErrorgetServerVersion(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for getRequiredEntitlements method
            * override this method for handling normal response from getRequiredEntitlements operation
            */
           public void receiveResultgetRequiredEntitlements(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.GetRequiredEntitlementsResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from getRequiredEntitlements operation
           */
            public void receiveErrorgetRequiredEntitlements(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for login method
            * override this method for handling normal response from login operation
            */
           public void receiveResultlogin(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.LoginResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from login operation
           */
            public void receiveErrorlogin(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for logout method
            * override this method for handling normal response from logout operation
            */
           public void receiveResultlogout(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.LogoutResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from logout operation
           */
            public void receiveErrorlogout(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for initialize method
            * override this method for handling normal response from initialize operation
            */
           public void receiveResultinitialize(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.InitializeResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from initialize operation
           */
            public void receiveErrorinitialize(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for emulateUser method
            * override this method for handling normal response from emulateUser operation
            */
           public void receiveResultemulateUser(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.EmulateUserResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from emulateUser operation
           */
            public void receiveErroremulateUser(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for deactivateTool method
            * override this method for handling normal response from deactivateTool operation
            */
           public void receiveResultdeactivateTool(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.DeactivateToolResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from deactivateTool operation
           */
            public void receiveErrordeactivateTool(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for getMemberships method
            * override this method for handling normal response from getMemberships operation
            */
           public void receiveResultgetMemberships(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.GetMembershipsResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from getMemberships operation
           */
            public void receiveErrorgetMemberships(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for initializeVersion2 method
            * override this method for handling normal response from initializeVersion2 operation
            */
           public void receiveResultinitializeVersion2(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.InitializeVersion2Response result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from initializeVersion2 operation
           */
            public void receiveErrorinitializeVersion2(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for loginTool method
            * override this method for handling normal response from loginTool operation
            */
           public void receiveResultloginTool(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.LoginToolResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from loginTool operation
           */
            public void receiveErrorloginTool(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for registerTool method
            * override this method for handling normal response from registerTool operation
            */
           public void receiveResultregisterTool(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.RegisterToolResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from registerTool operation
           */
            public void receiveErrorregisterTool(java.lang.Exception e) {
            }
                
           /**
            * auto generated Axis2 call back method for loginTicket method
            * override this method for handling normal response from loginTicket operation
            */
           public void receiveResultloginTicket(
                    edu.ku.it.si.bbcontextws.generated.ContextWSStub.LoginTicketResponse result
                        ) {
           }

          /**
           * auto generated Axis2 Error handler
           * override this method for handling error response from loginTicket operation
           */
            public void receiveErrorloginTicket(java.lang.Exception e) {
            }
                


    }
    