sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/m/MessageToast",
        "sap/ui/model/json/JSONModel"],
    function (oController, msgToast, jsonModel) {
        return oController.extend("upe.upetable1.controller.table5_1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                that.byId("idTable5_1").bindRows("/emp");
                that.detedItems = [];
                that.byId("idPanel5_1").setVisible(false);
                that.oTableForDeletedItems = new sap.m.Table("idTableDeleted5_1", {
                    alternateRowColors: true,
                    columns: [
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "Name"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "FatherName"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "City"
                            })
                        }),
                        new sap.m.Column({
                            header: new sap.m.Label({
                                text: "Phone Number"
                            })
                        })
                    ],
                    items: {
                        path: "/",
                        template: new sap.m.ColumnListItem({
                            cells: [
                                new sap.m.Text({
                                    text: "{name}"
                                }),
                                new sap.m.Text({
                                    text: "{fatherName}"
                                }),
                                new sap.m.Text({
                                    text: "{city}"
                                }),
                                new sap.m.Text({
                                    text: "{phone}"
                                })
                            ]
                        })
                    },
                    headerToolbar: new sap.m.Toolbar({
                        content: new sap.m.Button("idAppend", {
                            text: "InsertBack",
                            press: function () {
                                that.insertBack();
                            }
                        })
                    })
                });
            },
            onBack: function () {
                that.oRouter.navTo("RouteappView");
            },
            onDelete: function (oEvent) {
                var oTable = this.byId("idTable5_1");
                var selectedIndexes = oTable.getSelectedIndices();
                var oModel = this.getView().getModel();
                var empData = oModel.getProperty("/emp");
                if (selectedIndexes.length > 0) {
                    for (var i = selectedIndexes.length - 1; i >= 0; i--) {
                        that.byId("idPanel5_1").setVisible(true);
                        that.detedItems.push(empData[selectedIndexes[i]]);
                        empData.splice(selectedIndexes[i], 1);
                    }
                    for (var j = selectedIndexes.length - 1; j >= 0; j--) {
                        oTable.removeSelectionInterval(selectedIndexes[j], 0)
                    }
                    oModel.setProperty("/emp", empData);
                    var jsonModelForDeletedItems = new jsonModel();
                    jsonModelForDeletedItems.setData(that.detedItems);
                    that.oTableForDeletedItems.setModel(jsonModelForDeletedItems);
                    that.byId("idPanel5_1").addContent(that.oTableForDeletedItems);
                } else {
                    msgToast.show("Please select atleast on item before delete");
                }
            },
            insertBack: function () {
                var getDeletedTableData = that.oTableForDeletedItems.getModel().getData();
                var undeletedData = this.getView().getModel().getProperty("/emp");
                var totalData = undeletedData.concat(getDeletedTableData);
                that.oTableForDeletedItems.removeAllItems();
                this.getView().getModel().setProperty("/emp", totalData);
            }
        });
    }
);