sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ],
    function (oController, oHistory) {
        return oController.extend("upe.upetable1.controller.table9_1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                var oData = {
                    rows: []
                }
                for (var i = 0; i < 30; i++) {
                    var row = {
                        x: 'Row1_' + i,
                        y: 'Row2_' + i
                    }
                    oData.rows.push(row);
                }
                var oDataModel = new sap.ui.model.json.JSONModel();
                oDataModel.setData(oData);
                that.oTable = new sap.ui.table.Table("idTable9_1_1", {
                    alternateRowColors: true,
                    selectionMode: sap.ui.table.SelectionMode.Single,
                    visibleRowCount: 10,
                    columns: [
                        new sap.ui.table.Column({
                            autoResizable: true,
                            label: new sap.m.Label({
                                text: "Column_1"
                            }),
                            template: new sap.m.Text({
                                text: "{x}"
                            })
                        }),
                        new sap.ui.table.Column({
                            autoResizable: true,
                            label: new sap.m.Label({
                                text: "Column_2"
                            }),
                            template: new sap.m.Text({
                                text: "{y}"
                            })
                        })

                    ]
                }).setModel(oDataModel);
                that.buttonD = new sap.m.Button({
                    text: "Move Down",
                    width:"15em",
                    press: function (oEvent) {
                        that.buttonName = oEvent.getSource().getText();
                        that.selectionMovement(that.buttonName);
                    }
                });
                that.VBOX = new sap.m.VBox({
                }).addItem(that.buttonD);
                that.buttonU = new sap.m.Button({
                    text: "Move Up",
                    width:"15em",
                    press: function (oEvent) {
                        that.buttonName = oEvent.getSource().getText();
                        that.selectionMovement(that.buttonName);
                    }
                });
                that.buttonT = new sap.m.Button({
                    text: "Move to Top",
                    width:"15em",
                    press: function (oEvent) {
                        that.buttonName = oEvent.getSource().getText();
                        that.selectionMovement(that.buttonName);
                    }
                });
                that.buttonB = new sap.m.Button({
                    text: "Move to Bottom",
                    width:"15em",
                    press: function (oEvent) {
                        that.buttonName = oEvent.getSource().getText();
                        that.selectionMovement(that.buttonName);
                    }
                });
                that.VBOX.addItem(that.buttonU);
                that.VBOX.addItem(that.buttonT);
                that.VBOX.addItem(that.buttonB);
                that.oTable.bindRows("/rows");
                that.byId("idSplitter").addContentArea(that.oTable);
                that.byId("idSplitter").addContentArea(that.VBOX);
            },
            onBack: function () {
                var history = oHistory.getInstance();
                var previousTag = history.getPreviousHash();
                if (previousTag !== undefined) {
                    window.history.go(-1);
                } else {
                    that.oRouter.navTo("RouteappView");
                }
            },
            selectionMovement: function (name) {
                var selectedIndex = that.oTable.getSelectedIndex(),
                    noOfRows = that.oTable._iBindingLength;
                if (name === 'Move Down') {
                    selectedIndex = selectedIndex + 1;
                } else if (name === 'Move Up') {
                    selectedIndex = selectedIndex - 1;
                } else if (name === 'Move to Top') {
                    selectedIndex = 0.
                } else if (name === 'Move to Bottom') {
                    selectedIndex = noOfRows - 1.
                }
                that.oTable.setSelectedIndex(selectedIndex);
            }
        })
    }
);