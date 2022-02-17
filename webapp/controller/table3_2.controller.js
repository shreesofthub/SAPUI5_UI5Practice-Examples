sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ],
    function (oController,oHistory) {
        return oController.extend("upe.upetable1.controller.table3_2", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            onBack: function () {
                var history = oHistory.getInstance();
                var prevHashTag = history.getPreviousHash();
                if (prevHashTag !== undefined) {
                    window.history.go(-1);
                } else {
                    this.oRouter.navTo("table_3", true);
                }
            }
        })
    }
);