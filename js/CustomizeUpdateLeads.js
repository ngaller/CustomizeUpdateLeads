require(['dojo/aspect', 'Sage/MainView/Lead/UpdateLeads', 'Sage/UI/Controls/SingleSelectPickList', 'dojo/dom-construct'],
    function (aspect, UpdateLeads, SingleSelectPickList, domConstruct) {
        // add new properties to dropdown
        aspect.after(UpdateLeads.prototype, 'postMixInProperties', function () {
            this.loadUpdateableProperties('LeadQualifier', 'Lead Qualifier');
            this.loadUpdateableProperties('Status', 'Status');
        });
        // custom interface
        aspect.after(UpdateLeads.prototype, 'show', function () {
            var pkl = new SingleSelectPickList({
                className: 'display-none',
                style: 'padding: 8px 0',
                pickListName: 'Lead Status'
            });
            domConstruct.place(pkl.domNode, this.divAcctMgrContainer, 'after');
            this.pklStatus = pkl;
        });
        // show/hide custom editors
        aspect.after(UpdateLeads.prototype, '_propertyChanged', function () {
            var selectedProperty = this.propertyNameSelect.value;
            if (selectedProperty == 'LeadQualifier') {
                this.setDisplayProperty(this.divAcctMgrContainer, true);
            }
            this.setDisplayProperty(this.pklStatus.domNode, selectedProperty == 'Status');
        });
        // retrieve selection for custom properties
        aspect.after(UpdateLeads.prototype, 'getPropertySelectionValue', function (value) {
            var selectedProperty = this.propertyNameSelect.value;
            switch (selectedProperty) {
                case 'LeadQualifier':
                    if (this.lup_AcctMgr.selectedObject) {
                        return { name: 'LeadQualifier', value: this.lup_AcctMgr.selectedObject.$key };
                    }
                    break;
                case 'Status':
                    if (this.pklStatus.get('value')) {
                        return { name: 'Status', value: this.pklStatus.get('value') }
                    }
                    break;
            }
            return value;
        });

    });