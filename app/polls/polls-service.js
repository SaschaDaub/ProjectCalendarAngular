'use strict';

// Register `polls` service
angular.module('polls').factory('pollsService', ['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {
    var polls_options_array = [];
    var polls_array = [];
    var editedPolls = [];
    var newPolls = [];
    var newPollsOptions = [];

    function getPolls() {
        polls_array = $rootScope.polls_array;
        return polls_array;
    }

    function setPolls(polls) {
        $rootScope.polls_array = polls;
    }

    function getPollsOptions() {
        polls_options_array = $rootScope.polls_options_array;
        return polls_options_array;
    }

    function setPollsOptions(polls_options) {
        $rootScope.polls_options_array = polls_options;
    }

    function getEditedPolls() {
        return editedPolls;
    }

    function getNewPolls() {
        return newPolls;
    }

    function setNewPolls(newPls) {
        newPolls = newPls;
    }

    function getNewPollsOptions() {
        return newPollsOptions;
    }

    function setNewPollsOptions(NewPllsOpts) {
        newPollsOptions = NewPllsOpts;
    }

    async function getPollsFromDB() {
        if (polls_array.length == 0) {
            try {
                $http.post('/get_polls', {})
                    .then(function (response) {
                        if (response.data != false) {
                            response.data.forEach(function (item, index) {
                                polls_array.push({
                                    id: item.id,
                                    name: item.name
                                });
                            });
                            setPolls(polls_array);
                            $rootScope.$emit('pollsLoaded', {polls_array: polls_array});
                        }
                    });
            } catch (err) {
                throw err;
            }
        } else {
            $rootScope.$emit('pollsLoaded', {polls_array: polls_array});
        }
    }

    async function getPollsOptionsFromDB() {
        if (polls_options_array.length == 0) {
            try {
                $http.post('/get_polls_options', {})
                    .then(function (response) {
                        if (response.data != false) {
                            response.data.forEach(function (item, index) {
                                polls_options_array.push({
                                    id: item.id,
                                    start: item.startdate,
                                    end: item.enddate,
                                    pollFk: item.pollfk,
                                    count: item.count,
                                    name: item.name
                                });
                            });
                            setPollsOptions(polls_options_array);
                        }
                    });
            } catch (err) {
                throw err;
            }
        }
    }

    function savePolls() {
        $http.post('/save_polls',{editedPolls: editedPolls, newPolls: newPolls, newPollsOptions: newPollsOptions});
    }

    function writeVoteInDB(option) {
        $http.post('/save_vote', {option: option});
    }

    return {
        getPolls: getPolls,
        setPolls: setPolls,
        getEditedPolls: getEditedPolls,
        getNewPolls: getNewPolls,
        setNewPolls: setNewPolls,
        getNewPollsOptions: getNewPollsOptions,
        setNewPollsOptions: setNewPollsOptions,
        getPollsOptions: getPollsOptions,
        setPollsOptions: setPollsOptions,
        getPollsFromDB: getPollsFromDB,
        getPollsOptionsFromDB: getPollsOptionsFromDB,
        savePolls: savePolls,
        writeVoteInDB: writeVoteInDB
    };
}]);