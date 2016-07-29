'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;

        $scope.showMenu = false;
        $scope.message = "Loading...";

        $scope.dishes = {};
        menuFactory.getDishes()
            .then(
            function (response) {
                $scope.dishes = response.data;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
            );

        $scope.select = function (setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            }
            else if (setTab === 3) {
                $scope.filtText = "mains";
            }
            else if (setTab === 4) {
                $scope.filtText = "dessert";
            }
            else {
                $scope.filtText = "";
            }
        };
        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };
        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
    }])


    .controller('ContactController', ['$scope', function ($scope) {
        $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
        var channels = [{ value: 'tel', label: 'Tel' }, { value: 'email', label: 'Email' }];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])


    .controller('FeedbackController', ['$scope', function ($scope) {
        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "" && !$scope.feedback.mychannel)) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "" };
                $scope.feedback.mychannel = "";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])


    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
        $scope.dish = {};
        $scope.showDish = false;
        $scope.message = "Loading...";
        menuFactory.getDish(parseInt($stateParams.id, 10))
            .then(
            function (response) {
                $scope.dish = response.data;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        $scope.newComment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };

        $scope.postComment = function () {
            $scope.newComment.date = new Date();
            $scope.dish.comments.push($scope.newComment);
            console.log($scope.newComment);
            $scope.newComment = {
                rating: 5,
                comment: "",
                author: "",
                date: ""
            };
            $scope.commentForm.$setPristine();
            console.log($scope.newComment);
        };
    }])


    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
        $scope.featuredDish = {};
        $scope.featuredDishMessage = "Loading...";
        $scope.showFeaturedDish = false;
        menuFactory.getDish(0)
            .then(
            function (response) {
                $scope.featuredDish = response.data;
                $scope.showFeaturedDish = true;
            },
            function (response) {
                $scope.featuredDishMessage = "Error: " + response.status + " " + response.statusText;
            });


        $scope.promotionDishMessage = "Loading...";
        $scope.showPromotionDish = false;
        $scope.promotionDish = {};
        menuFactory.getPromotion(0)
            .then(
            function (response) {
                $scope.promotionDish = response.data;
                $scope.showPromotionDish = true;
            },
            function (response) {
                $scope.promotionDishMessage = "Error: " + response.status + " " + response.statusText;
            });


        $scope.executiveChef = {};
        $scope.executiveChefMessage = "Loading...";
        $scope.showExecutiveChef = false;
        corporateFactory.getLeader(3)
            .then(
            function (response) {
                $scope.executiveChef = response.data;
                $scope.showExecutiveChef = true;
            },
            function (response) {
                $scope.executiveChefMessage = "Error: " + response.status + " " + response.statusText;
            });
    }])


    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.leaders = {};
        $scope.leadersMessage = "Loading...";
        $scope.showLeaders = false;
        corporateFactory.getLeaders()
            .then(function (response) {
                $scope.leaders = response.data;
                $scope.showLeaders = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });
    }])

    ;