sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    function (oController) {
        return oController.extend("upe.upetable1.controller.appView", {
            onInit: function () {
                that = this;
                this.oRouter = this.getOwnerComponent().getRouter();

            },
            _on_Next: function () {
                if (this.byId("idPanelApp1").getExpanded() === true) {
                    this.Index = this.getView().byId("idRbg").getSelectedIndex();
                    if (this.Index === 0) {
                        this.oRouter.navTo("tView1");
                    } else if (this.Index === 1) {
                        this.oRouter.navTo("tableMulSel");
                    } else if (this.Index === 2)
                    // (this.getView().byId("idRbg").getSelectedButton().getText() === "Tabel_Delete single Record") 
                    {
                        this.oRouter.navTo("table_3");
                    } else if (this.Index === 3) {
                        this.oRouter.navTo("table4_1");
                    } else if (this.Index === 4) {
                        this.oRouter.navTo("table5_1")
                    } else if (this.Index === 5) {
                        this.oRouter.navTo("table6_1");
                    } else if (this.Index === 6) {
                        this.oRouter.navTo("table7_1");
                    } else if (this.Index === 7) {
                        this.oRouter.navTo("table8_1");
                    } else if (this.Index === 8) {
                        this.oRouter.navTo("table9_1");
                    } else if (this.Index === 9) {
                        this.oRouter.navTo("table10_1");
                    } else if (this.Index === 10) {
                        this.oRouter.navTo("table11_1");
                    } else if (this.Index === 11) {
                        this.oRouter.navTo("table12_1");
                    } else if (this.Index === 12) {
                        this.oRouter.navTo("table13_1");
                    } else if (this.Index === 13) {
                        this.oRouter.navTo("table14_1");
                    }
                } else if (this.byId("idPanelApp2").getExpanded() === true) {
                    var selectedIndex = this.byId("idRbg1").getSelectedIndex();
                    if (selectedIndex === 0) {
                        this.oRouter.navTo("cb1_1");
                    } else if (selectedIndex === 1) {
                        this.oRouter.navTo("cb2_1");
                    } else if (selectedIndex === 2) {
                        this.oRouter.navTo("cb3_1");
                    } else if (selectedIndex === 3) {
                        this.oRouter.navTo("cb4_1");
                    }
                } else if (this.byId("idPanelApp3").getExpanded() === true) {
                    var selectedIndex = this.byId("idRbg2").getSelectedIndex();
                    if (selectedIndex === 0) {
                        this.oRouter.navTo("nbv1_1");
                    } 
                    // else if (selectedIndex === 1) {
                    //     this.oRouter.navTo("nbv1_2");
                    // }
                } else if (this.byId("idPanelApp4").getExpanded() === true) {
                    var selectedIndex = this.byId("idRbg3").getSelectedIndex();
                    if (selectedIndex === 0) {
                        this.oRouter.navTo("iit1");
                    }
                }
            },
            onExpand: function (event) {
                if (event.getParameter("expand") === true) {
                    if (event.mParameters.id.includes("idPanelApp1")) {
                        this.setEnabled("idPanelApp2");
                        this.setEnabled("idPanelApp4");
                        this.setEnabled("idPanelApp3");
                    } else if (event.mParameters.id.includes("idPanelApp2")) {
                        this.setEnabled("idPanelApp1");
                        this.setEnabled("idPanelApp3");
                        this.setEnabled("idPanelApp4");
                    } else if (event.mParameters.id.includes("idPanelApp3")) {
                        this.setEnabled("idPanelApp1");
                        this.setEnabled("idPanelApp2");
                        this.setEnabled("idPanelApp4");
                    } else if (event.mParameters.id.includes("idPanelApp4")) {
                        this.setEnabled("idPanelApp1");
                        this.setEnabled("idPanelApp2");
                        this.setEnabled("idPanelApp3");
                    }
                }
            },
            setEnabled: function (panelId) {
                this.byId(panelId).setExpanded(false);
            }
        });
    }
);