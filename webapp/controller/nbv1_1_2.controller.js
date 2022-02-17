sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function (oController) {
        return oController.extend("upe.upetable1.controller.nbv1_1_2", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                that.oRouter.attachRoutePatternMatched(this.getSelectedIndex, this);
                var oSF = new sap.ui.layout.form.SimpleForm("idNbv1_1_2_SF", {
                    backgroundDesign: "Translucent",
                    editable: true,
                    width: "50%",
                    layout: "GridLayout",
                    content: [
                        new sap.m.Label({
                            text: "EmployeeName",
                            width:"100%"
                        }).addStyleClass("nbv1_1_2Input"),
                        new sap.m.Input({
                            value: "{eName}-{surName}",
                            editable: false
                        })
                    ]
                });
                that.byId("idNvb1_2P").addContent(oSF);
            },
            getSelectedIndex: function (oParams) {
                var index = oParams.getParameters().arguments.index;
                var sPath = "/empData/" + index;
                var model = sap.ui.getCore().getModel("nvb1_1_model");
                this.getView().setModel(model);
                this.getView().bindElement(sPath);
            },
            onBack: function () {
                that.byId("idNvb1_2P").unbindElement();
                var oHistory = new sap.ui.core.routing.History.getInstance();
                var prevHash = oHistory.getPreviousHash();
                if (prevHash !== undefined) {
                    window.history.go(-1);
                } else {
                    that.oRouter.navTo("nbv1_1");
                }
                // that.byId("idNvb1_2P").unbindElement();
            }
        });
    }
)