/**
 * Created by yonatom on 8/31/16.
 */

(function () {
    'use strict';



    angular
        .module('app.restaurant')
        .controller('EditorController', EditorController);
    /*@ngNoInject*/

    function EditorController() {

        var data = [
            {
                name: 'menutype',
                params: {

                },
                type: 1
            },
            {
                name: 'menugroup',
                params: {

                },
                type: 1
            },
            {
                name: 'menuofdaybutton',
                params: {

                },
                type: 1
            },
            {
                name: 'menusubgroup',
                params: {


                },
                type: 1
            },
            {
                name: 'menutitle',
                params: {


                },
                type: 1
            },
            {
                name: 'menulist',
                params: {


                },
                type: 1
            },
            {
                name: 'menulistcomment',
                params: {


                },
                type: 1
            },
            {
                name: 'bookbutton',
                params: {


                },
                type: 1
            },
            {
                name: 'datepicker',
                params: {


                },
                type: 1
            },
            {
                name: 'menulistorder',
                params: {


                },
                type: 1
            },
            {
                name: 'menulist_padding_size',
                params: {


                },
                type: 1
            },
            {
                name: 'headerchange',
                params: {


                },
                type: 1
            },

            {
                name: 'bgcolor',
                params: {
                    'parameter': 'white'
                },
                type: 2
            },

            {
                name: 'lang',
                params: {
                    'option': 'en'
                },
                type: 3,
                defaults: ['en', 'cz']
            },
            {
                name: 'showphoto',
                params: {
                    'option': 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'menusubgroup_activation',
                params: {
                    'option': 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'menulist_prefix_one',
                params: {
                    option: 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'menulist_prefix_two',
                params: {
                    option: 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'menutitle_rectangle',
                params: {
                    option: 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            },
            {
                name: 'show_order',
                params: {
                    option: 'on'
                },
                type: 3,
                defaults: ['on', 'off']
            }
        ];//-------array of datastore

        function params_generator() {
            $('#try').html(null);
            $.each(data, function (key_property, property) {
                $('#try').append(`
                    <div>
                        <h3>${property.name}</h3>
                        ${fields_generator(property)}
                        
                    </div>
                `)

            });
            button();
        }//-------create full HTML block

        function fields_generator(property) {
            var strol = '';

            $.each(property.params, function (key_param, param) {
                switch (property.type) {
                    case 1:
                    case 2:
                        strol += `
                    <label>${key_param}</label>
                    <input
                      type="text"
                      class="form-control"
                      data-name="${property.name}"
                      data-property="${key_param}"
                      value="${param}"
                      name="${property.name}-${key_param}" />`;
                        break;
                    case 3:
                        strol += `
                    <label>${key_param}</label>
                    <select data-name="${property.name}" 
                            data-property="${key_param}">
                        ${options_generator(property.defaults)}
                    </select>`;
                        break;
                }
            });

            return strol;
        }//-------generate all fields for one type

        function options_generator(options) {
            var options_string = '';

            $.each(options, function (key_option, option){
                options_string += `<option value="${option}">${option}</option>`;
            });

            return options_string;
        }//-------generate fields for option

        function button() {
            $('#try').append(`
                      <br/>
                      <button class="btn btn-primary" id="generate_button">Generate</button>
                      <br/>
                      <button class="btn btn-primary" id="open_window">New Window</button>
                      <br/>
                      <button class="btn btn-primary" id="Copycode" data-clipboard-text="">Copy code</button>`);

            $('#generate_button,#open_window').on('click', function () {
                if (this.id == 'generate_button') {
                    var a = '1';
                }
                else if (this.id == 'open_window') {
                    var a ='2';
                }


                $('input[type=text],select').each(function () {
                    var _name = $(this).data('name');
                    var _propertys = $(this).data('property');
                    var _value = $(this).val();


                    $.each(data, function (key_property, property) {
                        if (property.name == _name) {
                            data[key_property].params[_propertys] = _value;
                        }

                    });

                });

                urlgen(a);

            });
        }//-------------create button and start script for changing array from old one to new one

        function urlgen(a) {
            var strurl = '';
            $.each(data, function (key_property, property) {
                $.each(property.params, function (key_param, param) {

                    switch (property.type) {
                        case 1:strurl += `${property.name}[${key_param}]=${param}`;
                            break;
                        case 2:strurl += `${property.name}=${param}`;
                            break;
                        case 3:strurl += `${property.name}=${param}`;
                            break;

                    }
                    strurl += '&';

                });

                return strurl;

            });

            addhref(strurl,a);

        }//-------------generate values from fields to string variable

        function addhref(strurl,a){
            var a_href = 'http://gastro-booking.cz/#/widget/restaurant/2';
            var res = a_href.split("#");
            var newhref=res[0]+"?"+strurl+"#"+res[1];

            check_button(newhref,a);

        };//-------add to url our values

        function check_button(newhref,a){
            if( a =='1'){

                var sourcecode=`<iframe id="frame" src="${newhref}" height="700px" width="100%"></iframe>`;

                $('#frame').attr('src', '').attr('src',newhref);
                $('#Copycode').attr('data-clipboard-text',sourcecode);
            }
            else {
                window.open(newhref)
            }
        };

        $('.adder').on('click',function(){

            var _name= $('#name').val();
            var _property = $('#property').val();
            var _param = $('#value').val();
            var check=true;

            $.each(data, function(key_property, property) {

                if(property.name == _name) {
                    property.params[_property] = _param;
                    check=false;
                }
            });

            if(check == true){
                data.unshift({name:_name,params:{[_property]:_param},type:1})
            }

            params_generator();

        });//-------Add fields functioon


        function init() {
            params_generator();

        }//---------------initialise functions

        init();

    }

})();