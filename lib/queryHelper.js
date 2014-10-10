"use strict";

(function () {
    var _ = require('underscore');
    module.exports = {

        /**
         * Помогает сгенерировать строку запроса к БД из объекта
         * @param {Object} searchObject объект с поисковыми параметрами
         * @param {Object} [paramTypes] объект с типами полей
         * @returns {String} готовая строка, которую можно вставлять в запрос
         */
        where: function (searchObject, paramTypes) {
            paramTypes = paramTypes || {};
            return _.map(_.keys(searchObject), function (key) {
                switch (paramTypes[key]) {
                    case "SET":
                        return ['FIND_IN_SET(?,', key, ')'].join('');
                    default:
                        return [key, searchObject[key] instanceof Array ? ' IN (?)' : '=?'].join('');
                }
            }).join(' AND ');
        },

        /**
         * Помогает сгенерировать строку для подстановки в INSERT/UPDATE запрос к MySQL
         * @param {Object} setObject объект с параметрами, которые надо вставить в запрос
         * @returns {String}
         */
        set: function (setObject) {
            return _.map(_.keys(setObject), function (key) {
                return key + '=?';
            }).join(',');
        },

        /**
         * Помогает сгенерировать строку с сортировкой для подстановки в SQL запрос
         * @param {Object} orderObject объект с параметрами сортировки
         * @returns {String}
         */
        order: function(orderObject){
            return _.map(_.keys(orderObject), function(key){
                return [key, orderObject[key]].join(' ');
            }).join(',')
        }
    }
}());