'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;

        $scope.showMenu = false;
        $scope.message = "Loading...";

        $scope.dishes = menuFactory.getDishes().query(
            function (response) {
                $scope.dishes = response;
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


    .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
        $scope.sendFeedback = function () {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "" && !$scope.feedback.mychannel)) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                feedbackFactory.getFeedback()
                    .save($scope.feedback);
                $scope.invalidChannelSelection = false;
                $scope.feedback = { mychannel: "", firstName: "", lastName: "", agree: false, email: "", comments: "" };
                $scope.feedback.mychannel = "";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])


    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
        $scope.showDish = false;
        $scope.message = "Loading...";
        $scope.dish = menuFactory.getDishes()
            .get({ id: parseInt($stateParams.id, 10) })
            .$promise.then(
            function (response) {
                $scope.dish = response;
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

        $scope.forms = {};

        $scope.postComment = function () {
            if (!$scope.forms.commentForm.$valid) {
                console.log('Invalid Form');
                return;
            }
            $scope.newComment.date = new Date().toISOString();
            $scope.newComment.rating = parseInt($scope.newComment.rating);
            $scope.dish.comments.push($scope.newComment);
            console.log($scope.newComment);
            menuFactory.getDishes().update({ id: $scope.dish.id }, $scope.dish);
            $scope.forms.commentForm.$setPristine();
            $scope.newComment = {
                rating: 5,
                comment: "",
                author: "",
                date: ""
            };
            console.log($scope.newComment);
        };
    }])


    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
        $scope.featuredDishMessage = "Loading...";
        $scope.showFeaturedDish = false;
        $scope.featuredDish = menuFactory.getDishes()
            .get({ id: 0 })
            .$promise.then(
            function (response) {
                $scope.featuredDish = response;
                $scope.showFeaturedDish = true;
            },
            function (response) {
                $scope.featuredDishMessage = "Error: " + response.status + " " + response.statusText;
            });


        $scope.promotionDishMessage = "Loading...";
        $scope.showPromotionDish = false;
        $scope.promotionDish = menuFactory.getPromotion()
            .get({ id: 0 })
            .$promise.then(
            function (response) {
                $scope.promotionDish = response;
                $scope.showPromotionDish = true;
            },
            function (response) {
                $scope.promotionDishMessage = "Error: " + response.status + " " + response.statusText;
            });


        $scope.executiveChefMessage = "Loading...";
        $scope.showExecutiveChef = false;
        $scope.executiveChef = corporateFactory.getLeaders()
            .get({ id: 3 })
            .$promise.then(
            function (response) {
                $scope.executiveChef = response;
                $scope.showExecutiveChef = true;
            },
            function (response) {
                $scope.executiveChefMessage = "Error: " + response.status + " " + response.statusText;
            });
    }])


    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {
        $scope.leadersMessage = "Loading...";
        $scope.showLeaders = false;
        $scope.leaders = corporateFactory.getLeaders()
            .query()
            .$promise.then(
            function (response) {
                $scope.leaders = response;
                $scope.showLeaders = true;
            },
            function (response) {
                $scope.leadersMessage = "Error: " + response.status + " " + response.statusText;
            });
    }])

    ;