/**
 * Custom binding for date time picker
 * @type {Object}
 */
ko.bindingHandlers.dateTimePicker = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().dateTimePickerOptions || {
            format: 'YYYY-MM-DD hh:mm'
        };
        $(element).datetimepicker(options);

        //when a user changes the date, update the view model
        ko.utils.registerEventHandler(element, "dp.change", function(event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                if (event.date != null && !(event.date instanceof Date)) {
                    value(event.date.toDate());
                } else {
                    value(event.date);
                }
            }
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
            var picker = $(element).data("DateTimePicker");
            if (picker) {
                picker.destroy();
            }
        });
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        var picker = $(element).data("DateTimePicker");
        //when the view model is updated, update the widget
        if (picker) {
            var koDate = ko.utils.unwrapObservable(valueAccessor());

            //in case return from server datetime i am get in this form for example /Date(93989393)/ then fomat this
            if (typeof koDate !== "undefined") {
                koDate = (typeof(koDate) !== 'object') ? new Date(parseFloat(koDate.replace(/[^0-9]/g, ''))) : koDate;
                picker.date(koDate);
            }


        }
    }
};


/**
 * Custom Binding for select picker
 * @type {Object}
 */
ko.bindingHandlers.selectPicker = {
    init: function(element, valueAccessor, allBindingsAccessor) {
        var selectPickerOptions = allBindingsAccessor().selectPickerOptions;
        if ($(element).is('select')) {
            if (ko.isObservable(valueAccessor())) {
                if ($(element).prop('multiple') && $.isArray(ko.utils.unwrapObservable(valueAccessor()))) {
                    // in the case of a multiple select where the valueAccessor() is an observableArray, call the default Knockout selectedOptions binding
                    ko.bindingHandlers.selectedOptions.init(element, valueAccessor, allBindingsAccessor);
                } else {
                    // regular select and observable so call the default value binding
                    ko.bindingHandlers.value.init(element, valueAccessor, allBindingsAccessor);
                    if(typeof ko.utils.unwrapObservable(valueAccessor()) !== "undefined" && selectPickerOptions.edit == true){
                        $(element).val(ko.utils.unwrapObservable(valueAccessor()));
                        console.log('Test');
                    }
                }
            }
            
            // $(element).val(valueAccessor());
            $(element).addClass('selectpicker').selectpicker();
        }
    },
    update: function(element, valueAccessor, allBindingsAccessor) {
        if ($(element).is('select')) {
            var selectPickerOptions = allBindingsAccessor().selectPickerOptions;
            // selectPickerOptions.edit = false;

            if (typeof selectPickerOptions !== 'undefined' && selectPickerOptions !== null) {
                var options = selectPickerOptions.optionsArray,
                    optionsText = selectPickerOptions.optionsText,
                    optionsValue = selectPickerOptions.optionsValue,
                    optionsCaption = selectPickerOptions.optionsCaption,
                    isDisabled = selectPickerOptions.disabledCondition || false,
                    resetOnDisabled = selectPickerOptions.resetOnDisabled || false;
                if (ko.utils.unwrapObservable(options).length > 0) {
                    // call the default Knockout options binding
                    ko.bindingHandlers.options.update(element, options, allBindingsAccessor);
                }
                if (isDisabled && resetOnDisabled) {
                    // the dropdown is disabled and we need to reset it to its first option
                    $(element).selectpicker('val', $(element).children('option:first').val());
                }
                $(element).prop('disabled', isDisabled);
            }
            if (ko.isObservable(valueAccessor())) {
                if ($(element).prop('multiple') && $.isArray(ko.utils.unwrapObservable(valueAccessor()))) {
                    // in the case of a multiple select where the valueAccessor() is an observableArray, call the default Knockout selectedOptions binding
                    ko.bindingHandlers.selectedOptions.update(element, valueAccessor);
                } else {
                    // call the default Knockout value binding
                    ko.bindingHandlers.value.update(element, valueAccessor);

                }

            }
            if(typeof ko.utils.unwrapObservable(valueAccessor()) !== "undefined" && selectPickerOptions.edit == true){
                $(element).val(ko.utils.unwrapObservable(valueAccessor()));

            }
            
            $(element).selectpicker('refresh');
        }
    }
};

/**
 * Custom binding for boot grid
 * @type {Object}
 */
ko.bindingHandlers.bootgrid = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        var _default = {
            css: {
                icon: 'zmdi icon',
                iconColumns: 'zmdi-view-module',
                iconDown: 'zmdi-expand-more',
                iconRefresh: 'zmdi-refresh',
                iconUp: 'zmdi-expand-less'
            },
            formatters: {
                "commands": function(column, row) {
                    return "<button data-bind = \"click: $parent.getPurchase\" type=\"button\" class=\"btn btn-icon command-edit\" data-row-id=\"" + row.id + "\"><span class=\"zmdi zmdi-format-list-numbered\"></span></button> " +
                        "<button type=\"button\" class=\"btn btn-icon command-delete\" data-row-id=\"" + row.id + "\"><span class=\"zmdi zmdi-edit\"></span></button>";
                }
            },
            selection: true,
            multiSelect: true,
            rowSelect: true,
            keepSelection: true,
        };

        var options = allBindings().options || _default;

        $(element).bootgrid(options);
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
    }
};

ko.bindingHandlers.numberInput = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        $(element).attr('type', 'number').attr('min', '1');

        $(element).on("change", function() {
            if (this.value < 0) {
                this.value = 1;
            }
        });
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.

        var value = $(element).val();
        valueAccessor(value);
        console.log($(element).val());
    }
};

ko.bindingHandlers.dataTable = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called when the binding is first applied to an element
        // Set up any initial state, event handlers, etc. here
        var _default = {
                responsive:true,
                "language": {
                    "paginate": {
                        "previous": "&lt;",
                        "next": "&gt;"
                    }
                }
            },
            options = allBindings().dataTableOptions || _default;
        $(element).DataTable(options);
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.

    }
};