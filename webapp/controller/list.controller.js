sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"],
    function (oController, history) {
        return oController.extend("upe.upetable1.controller.list", {
            onInit: function () {
                oRouter = this.getOwnerComponent().getRouter();
                var oList = new sap.m.List("idList", {
                    headerText: "Selected Items List",
                    items: {
                        path: "/selectedData",
                        template: new sap.m.StandardListItem({
                            title: "{id}",
                            description:"{name}",
                            info:"{fatherName}"
                        })
                    }
                });
                // oList.bindItems("/selectedData", template);
                this.byId("idSFPanel").addContent(oList);
            },
            onBack: function () {
                var oHistory = history.getInstance();
                var previousHash = oHistory.getPreviousHash();
                if (previousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    oRouter.navTo("overview", true);
                }
            }
        });
    });