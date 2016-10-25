/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // allFeeds object and ensures it has a URL defined and not empty
        it('URL defined and is not empty', function() {
            allFeeds.forEach(function(feed) {
                feedUrl = feed.url;
                expect(feedUrl).toBeDefined();
                expect(feedUrl.length).not.toBe(0);
            });
        });

        // allFeeds object and ensures it has a name defined and not empty
        it('name is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                feddName = feed.name;
                expect(feddName).toBeDefined();
                expect(feddName.length).not.toBe(0);
            });
        });
    });

    // body has the class of menuhidden to make it hidden by default
    describe('The menu', function() {
        it('hidden menu', function() {
            expect($('.menu-hidden').is(':visible')).toBe(true);
        });

        it('visible on click', function() {
            $('a.menu-icon-link').trigger('click');
            expect($('.menu-hidden').is(':visible')).toBe(false);
        });

        it('hidden when clicked again', function() {
            $('a.menu-icon-link').trigger('click');
            expect($('.menu-hidden').is(':visible')).toBe(true);
        });
    });


    describe('Initial Entries', function() {
        // run before test
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('entry element is present', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function(){
        var feed;

        // when a new feed is loaded by the loadFeed function that the content actually changes
        beforeEach(function(done) {
            loadFeed(0, function() {
                feed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('has been loaded', function(){
           expect($('.feed').html()).not.toEqual(feed);
        });
    });
}());
