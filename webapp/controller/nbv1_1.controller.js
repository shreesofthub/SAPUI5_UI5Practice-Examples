sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History",
        "sap/ui/model/json/JSONModel"],
    function (oController, oHistory, oJsonModel) {
        return oController.extend("upe.upetable1.controller.nbv1_1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                var jsonData = {
                    "empData": [
                        { "eName": "Joseph", "surName": "Killi" },
                        { "eName": "Cristofer", "surName": "Bolli" },
                        { "eName": "Neelofer", "surName": "Malli" }
                    ]
                };
                var model = new oJsonModel(jsonData);
                sap.ui.getCore().setModel(model, "nvb1_1_model");
                var oList = new sap.m.List("idNbv1_1List", {
                    backgroundDesign: "Translucent",
                    headerText: "List of Employee Names-List View",
                    mode: "SingleSelectMaster",
                    showSeparators: sap.m.ListSeparators.All,
                    width: "50%",
                    select: function (oEvent) {
                        var selectedIndex = oEvent.getParameter("listItem").getBindingContextPath().split("/")[2];
                        that.oRouter.navTo("nbv1_1_2", {
                            index: selectedIndex
                        });
                    }
                }).setModel(model);
                var listItem = new sap.m.StandardListItem({
                    title: "{eName}"
                });
                oList.bindItems("/empData", listItem);
                that.byId("idNvb1P").addContent(oList);
            },
            onBack: function () {
                var history = oHistory.getInstance();
                var prevHash = history.getPreviousHash();
                if (prevHash !== undefined) {
                    window.history.go(-1);
                } else {
                    that.oRouter.navTo("RouteappView");
                }
            }
        })
    }
)