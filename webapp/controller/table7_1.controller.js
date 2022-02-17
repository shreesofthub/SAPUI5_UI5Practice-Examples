sap.ui.define(
    ["sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"],
    function (oController, oHistory
    ) {
        return oController.extend("upe.upetable11.controller.table7_1", {
            onInit: function () {
                that = this;
                that.oRouter = that.getOwnerComponent().getRouter();
                that.jsonModel = new sap.ui.model.json.JSONModel();
                that.deletedRecordJsonModel = new sap.ui.model.json.JSONModel();
                //Local Array 
                that.row = {
                    "empData": []
                };
                that.deletedRecords = [];
                that.oRouter = that.getOwnerComponent().getRouter();
                //Panel Declartion
                var oPanel = new sap.m.Panel("idPanel", {
                    expandable: true,
                    headerText: "Input",
                    headerToolbar: new sap.m.Toolbar({
                        content: new sap.m.CheckBox("idBox", {
                            text: "Navigate to Next Screen to Display Deleted Records",
                            selected: false,
                            select: function (oEvent) {
                                var getCheckBoxSelection = oEvent.getParameters("selected");
                                if (getCheckBoxSelection.selected === true) {
                                    that.oRouter.navTo("table7_2");
                                }
                            }
                        })
                    })
                });
                oPanel.getHeaderToolbar().getContent()[0].setSelected(false);
                //Simple-form Declaration
                var sform = new sap.ui.layout.form.SimpleForm({
                    id: "idSF",
                    adjustLabelSpan: true,
                    layout: sap.ui.layout.form.SimpleFormLayout.ResponsiveGridLayout,
                    title: new sap.ui.core.Title({
                        text: "Please Give User Information"
                    }),
                    content: [
                        new sap.m.Label({
                            text: "First Name"
                        }),
                        new sap.m.Input("idIP1", {}),
                        new sap.m.Label({
                            text: "Last Name"
                        }),
                        new sap.m.Input("idIP2", {}),
                        new sap.m.Label({
                            text: "Age"
                        }),
                        new sap.m.Input("idIP3", {}),
                        new sap.m.Label({
                            text: "City"
                        }),
                        new sap.m.Input("idIP4", {}),
                        new sap.m.Label({
                            text: ""
                        }),
                        //To Add records into Table
                        new sap.m.Button("idAdd", {
                            text: "Add",
                            tooltip: "This Button to Add above Inputs into below Table as a Record",
                            press: function () {
                                that.Addition();
                                if (that.oTable.getRows().length === 0) {
                                    that.byId("idLayout7_1").addContent(that.oTable);
                                }
                            }
                        }),
                        //To Delete Records from Table
                        new sap.m.Button("idDele", {
                            text: "Delete",
                            press: function () {
                                that.deletion();
                            }
                        })
                    ]
                });
                //Add Simple-form into Panel
                oPanel.addContent(sform);
                //Add Pannel into Layout.
                that.byId("idLayout7_1").addContent(oPanel);
            },
            onBack: function () {
                this.oRouter.navTo("RouteappView", true);

            },
            Addition: function () {
                if (that.byId("idLayout7_1").getContent()[0].getContent()[0]._aElements[1].getValue() !== null) {
                    //Get the all Input Data and append to Local Array
                    var userInformation = {
                        "firtsName": that.byId("idLayout7_1").getContent()[0].getContent()[0]._aElements[1].getValue(),
                        "lastName": that.byId("idLayout7_1").getContent()[0].getContent()[0]._aElements[3].getValue(),
                        "age": that.byId("idLayout7_1").getContent()[0].getContent()[0]._aElements[5].getValue(),
                        "city": that.byId("idLayout7_1").getContent()[0].getContent()[0]._aElements[7].getValue()
                    };
                    that.row.empData.push(userInformation);
                    that.jsonModel.setData(that.row);
                    // Definition of Table
                    if (that.oTable === undefined) {
                        that.tableFormation();
                        //set the Model to Table
                        that.oTable.setModel(that.jsonModel);
                        //bind the rows to table.
                        that.oTable.bindRows("/empData");
                    }
                } else {

                }
            },
            deletion: function () {
                var empData = that.jsonModel.getProperty("/empData");
                if (that.oTable.getSelectedIndices().length > 0) {
                    for (var k = that.oTable.getSelectedIndices().length - 1; k >= 0; k--) {
                        var deleteRecord = empData.splice(that.oTable.getSelectedIndices()[k], 1);
                        that.deletedRecords.push(deleteRecord[0]);
                    }
                } else {
                    var deleteRecord = empData.splice(0, 1);
                    that.deletedRecords.push(deleteRecord[0]);
                }
                that.oTable.clearSelection();
                that.jsonModel.setProperty("/empData", empData);
                that.deletedRecordJsonModel.setData(that.deletedRecords);
                sap.ui.getCore().setModel(that.deletedRecordJsonModel, "deletedModel");
            },
            tableFormation: function () {
                that.oTable = new sap.ui.table.Table("idTable7_1", {
                    title: "Records from Above Input",
                    columns: [
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "First Name"
                            }),
                            template: new sap.m.Text({
                                text: "{firtsName}"
                            })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "Last Name"
                            }),
                            template: new sap.m.Text({
                                text: "{lastName}"
                            })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "Age"
                            }),
                            template: new sap.m.Text({
                                text: "{age}"
                            })
                        }),
                        new sap.ui.table.Column({
                            label: new sap.m.Label({
                                text: "City"
                            }),
                            template: new sap.m.Text({
                                text: "{city}"
                            })
                        })
                    ]
                });
            }


        })
    }
);