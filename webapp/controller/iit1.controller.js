sap.ui.define(
    ["sap/ui/core/mvc/Controller"
    ],
    function (oController, oHistory) {
        return oController.extend("upe.upetable1.controller.iit1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                var sfOutPut = new sap.ui.layout.form.SimpleForm({
                    id: "idSfOp",
                    backgroundDesign: "Translucent",
                    editable: true,
                    layout: sap.ui.layout.form.SimpleFormLayout.GridLayout,
                    width: "50%",
                    content: [
                        new sap.m.Label({
                            text: "FirstName"
                        }),
                        new sap.m.Input("idSfI2_1", {
                            editable: false
                        }),
                        new sap.m.Label({
                            text: "LastName"
                        }),
                        new sap.m.Input("idSfI2_2", {
                            editable: false
                        }),
                        new sap.m.Label({
                            text: "Age"
                        }),
                        new sap.m.Input("idSfI2_3", {
                            editable: false
                        }),
                        new sap.m.Label({
                            text: "FirstName"
                        }),
                        new sap.m.Input("idSfI2_4", {
                            editable: false
                        }),
                    ],
                    title: new sap.ui.core.Title({
                        text: "OutPut Form"
                    })
                });
                that.byId("idIit1P").addContent(sfOutPut);
            },
            onBack: function () {
                this.oRouter.navTo("RouteappView");
            },
            onDisplay: function () {
                if (that.byId("idSfB1").getText() === "Display") {
                    that.getValueById("idSfI1_1", "idSfI2_1");
                    that.getValueById("idSfI1_2", "idSfI2_2");
                    that.getValueById("idSfI1_3", "idSfI2_3");
                    that.getValueById("idSfI1_4", "idSfI2_4");
                    that.byId("idSfIp").setVisible(false);
                    that.byId("idSfB1").setText("Input");
                } else {
                    that.byId("idSfB1").setText("Display");
                    that.byId("idSfIp").setVisible(true);                    
                }
            },
            getValueById: function (idI, idD) {
                sap.ui.getCore().byId(idD).setValue(that.byId(idI).getValue());
            }
        })
    }
);