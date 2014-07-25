"use strict";

(function () {
    var _ = require('underscore');
    module.exports = {

        /**
         * Помогает сгенерировать строку запроса к БД из объекта
         * @param searchObject {Object} объект с поисковыми параметрами
         * @returns {string} готовая строка, которую можно вставлять в запрос
         */
        where: function (searchObject) {
            return _.map(_.keys(searchObject), function (key) {
                return [key, searchObject[key] instanceof Array ? ' IN (?)' : '=?'].join('');
            }).join(' AND ');
        },

        /**
         * Помогает сгенерировать строку для подстановки в INSERT/UPDATE запрос к MySQL
         * @param setObject {Object} объект с параметрами, которые надо вставить в запрос
         * @returns {string}
         */
        set: function (setObject) {
            return _.map(_.keys(setObject), function (key) {
                return key + '=?';
            }).join(',');
        },

        /**
         * Помогает сгенерировать строку с сортировкой для подстановки в SQL запрос
         * @param orderObject {Object} объект с параметрами сортировки
         * @returns {string|*}
         */
        order: function(orderObject){
            return _.map(_.keys(orderObject), function(key){
                return [key, orderObject[key]].join(' ');
            }).join(',')
        }
    }
}());