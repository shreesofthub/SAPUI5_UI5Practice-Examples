sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/model/json/JSONModel"],
    function (oController, jsonModel) {
        return oController.extend("upe.upetable1.controller.table6_1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                var oStateData = [];
                that.deleteData = [];
                for (index = 0; index < 20; index++) {
                    oStateData.push({
                        state: "state" + index,
                        capitalCity: "capitalCity" + index
                    })
                }
                var stateJsonModel = new jsonModel();
                that.deleteJsonModel = new jsonModel();
                stateJsonModel.setData(oStateData);
                that.deleteJsonModel.setData(that.deleteData);
                // Dynamical Page Header Addition.
                var pageHeader = new sap.m.CheckBox("idCB", {
                    text: "Table Selection Mode",
                    tooltip: "based on this checkbox selection,below Table1 selectionMode will change",
                    select: function (oEvent) {
                        // set the Table1 SelectionMode based on checbox selection.                        
                        that.checkBoxSelection(oEvent);
                    }
                });
                that.byId("idPage6_1").addHeaderContent(pageHeader);
                // Table1 Design.                
                that.oTable6_1 = new sap.ui.table.Table("idTable6_1", {
                    alternateRowColors: true,
                    selectionMode: sap.ui.table.SelectionMode.Single,
                    columns: [
                        new sap.ui.table.Column({
                            autoResizable: true,
                            width: "15em",
                            label: new sap.m.Label({
                                text: "State"
                            }),
                            template: new sap.m.Text({
                                text: "{state}"
                            })
                        }),
                        new sap.ui.table.Column({
                            autoResizable: true,
                            label: new sap.m.Label({
                                text: "capitalCity"
                            }),
                            template: new sap.m.Text({
                                text: "{capitalCity}"
                            })
                        })
                    ],
                    footer: new sap.m.Button("idButton6_1", {
                        text: "Delete",
                        width: "30%",
                        type: "Negative",
                        press: function () {
                            that.deleteCode();
                        }
                    })

                });
                // Set the Model to Table                
                that.oTable6_1.setModel(stateJsonModel);
                that.oTable6_1.bindRows("/");
                // Add Table to VBOX1                
                that.byId("idVBox6_1_1").addItem(that.oTable6_1);
                // Design Table2                
                that.oTable6_2 = new sap.ui.table.Table("idTable6_2", {
                    columns: [
                        new sap.ui.table.Column({
                            width: "15em",
                            label: new sap.m.Label({
                                text: "State",
                            }),
                            template: new sap.m.Text({
                                text: "{state}"
                            })
                        }),
                        new sap.ui.table.Column({
                            width: "15em",
                            label: new sap.m.Label({
                                text: "capitalCity",
                            }),
                            template: new sap.m.Text({
                                text: "{capitalCity}"
                            })
                        })
                    ]
                });
            },
            // CheckBox Selection Code.
            checkBoxSelection: function (evnt) {
                var checboxSelection = evnt.getParameters("selected");
                if (evnt.getParameters().selected === true) {
                    that.oTable6_1.setSelectionMode(sap.ui.table.SelectionMode.MultiToggle);
                } else {
                    that.oTable6_1.setSelectionMode(sap.ui.table.SelectionMode.Single);
                }
            },
            // Navigation to Previous View Code            
            onBack: function () {
                that.oRouter.navTo("RouteappView");
            },
            // Table1 Row Deletion Code            
            deleteCode: function () {
                tableModel = that.oTable6_1.getModel();
                var totalData = tableModel.getProperty("/");
                // Get the Delted Record to Add into Table2. 
                if (that.oTable6_1.getSelectionMode() === 'Single') {
                    var getSelectedIndex = that.oTable6_1.getSelectedIndex();
                    var deletedRow = totalData.splice(getSelectedIndex, 1);
                    tableModel.setProperty("/", totalData);
                    // Add table1 deleted Record to Table2.                
                    that.deleteData.push(deletedRow[0]);
                } else {
                    var getSelectedIndexes = that.oTable6_1.getSelectedIndices();
                    if (getSelectedIndexes.length > 0) {
                        for (var i = getSelectedIndexes.length - 1; i >= 0; i--) {
                            var deletedRow = totalData.splice(getSelectedIndexes[i], 1);
                            that.deleteData.push(deletedRow[deletedRow.length - 1])
                        }
                        tableModel.setProperty("/", totalData);
                    }
                    for (var j = getSelectedIndexes.length - 1; j >= 0; j--) {
                        that.oTable6_1.removeSelectionInterval(getSelectedIndexes[j], 0);
                    }
                }
                if (that.deleteData.length > 0) {
                    that.oTable6_2.setModel(that.deleteJsonModel);
                    that.oTable6_2.bindRows("/");
                    that.byId("idVBox6_1_2").addItem(that.oTable6_2);
                }
            }
        });
    });