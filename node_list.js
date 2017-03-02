module.exports = function(RED) {
    "use strict";

    function listNodes(config) {
        RED.nodes.createNode(this, config);
        
        var mainFilter = config.mainfilter || "";
        var typeFilter = config.typefilter || "";
        var nameFilter = config.namefilter || "";
        var typePattern = new RegExp(typeFilter);
        var namePattern = new RegExp(nameFilter);
        var nodeInfoArray = [];
                
        RED.nodes.eachNode(function(node) {
            var nodeInfo = null;
            
            if (typeFilter.length == 0 || typePattern.test(node.type)) {
                // Don't store the nodes themselves, to avoid keeping references to them.
                // Don't store all the attributes of the nodes, to avoid security leaks (e.g. attributes that contain passwords).
                if (mainFilter === "tabs") {
                    // When tabsheets are required, only show nodes of type 'tab' (that have a label instead of a name)
                    if (node.type === "tab") {
                        if (nameFilter.length == 0 || namePattern.test(node.label)) {
                            nodeInfo = { id: node.id, type: node.type, label: node.label };
                        }
                    }
                }
                else {
                    // When nodes are required, only show nodes without type 'tab' (that have a name instead of a label)
                    if (node.type !== "tab") {
                        if (nameFilter.length == 0 || namePattern.test(node.name)) {
                            nodeInfo = { id: node.id, type: node.type, name: node.name };
                        }
                    }
                }
            }
            
            if (nodeInfo != null) {
                nodeInfoArray.push(nodeInfo);
            }                
        });
        
        var node = this;

        this.on("input", function(msg) {
           var msg = { payload: nodeInfoArray };
           node.send(msg);
        });
    }

    RED.nodes.registerType("node-list", listNodes);
};
