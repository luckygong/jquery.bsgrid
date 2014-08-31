/**
 * jquery_pagination adapter for bsgrid.
 *
 * jQuery.bsgrid v1.20 by @Baishui2004
 * Copyright 2014 Apache v2 License
 * https://github.com/baishui2004/jquery.bsgrid
 */
/**
 * require common.js, grid.js.
 *
 * @author Baishui2004
 * @Date August 31, 2014
 */
$.fn.bsgrid.getCurPage = function (options) {
    return options.curPage;
};

$.fn.bsgrid.refreshPage = function (options) {
    $.fn.bsgrid.getGridObj(options.gridId).page($.fn.bsgrid.getCurPage(options));
};

$.fn.bsgrid.firstPage = function (options) {
    $.fn.bsgrid.getGridObj(options.gridId).page(1);
};

$.fn.bsgrid.prevPage = function (options) {
    var curPage = $.fn.bsgrid.getCurPage(options);
    if (curPage <= 1) {
        alert($.bsgridLanguage.isFirstPage);
        return;
    }
    $.fn.bsgrid.getGridObj(options.gridId).page(curPage - 1);
};

$.fn.bsgrid.nextPage = function (options) {
    var curPage = $.fn.bsgrid.getCurPage(options);
    if (curPage >= options.totalPages) {
        alert($.bsgridLanguage.isLastPage);
        return;
    }
    $.fn.bsgrid.getGridObj(options.gridId).page(curPage + 1);
};

$.fn.bsgrid.lastPage = function (options) {
    $.fn.bsgrid.getGridObj(options.gridId).page(options.totalPages);
};

$.fn.bsgrid.gotoPage = function (options, goPage) {
    if (goPage == undefined) {
        return;
    }
    if (isNaN(goPage)) {
        alert($.bsgridLanguage.needInteger);
    } else if (parseInt(goPage) < 1 || parseInt(goPage) > options.totalPages) {
        alert($.bsgridLanguage.needRange(1, options.totalPages));
    } else {
        $.fn.bsgrid.getGridObj(options.gridId).page(goPage);
    }
};

$.fn.bsgrid.initPaging = function (options) {
    $('#' + options.pagingOutTabId + ' td').append('<div id="' + options.pagingId + '"></div>');
};

$.fn.bsgrid.setPagingValues = function (options) {
    $('#' + options.pagingId).pagination(options.totalRows, {
        current_page: options.curPage - 1,
        num_display_entries: 5,
        num_edge_entries: 2,
        items_per_page: options.settings.pageSize,
        // link_to: "#",
        prev_text: $.bsgridLanguage.pagingToolbar.prevPage,
        next_text: $.bsgridLanguage.pagingToolbar.nextPage,
        // ellipse_text: "...",
        // prev_show_always: true,
        // next_show_always: true,
        // renderer: "defaultRenderer",
        // load_first_page: false,
        callback: function (page_index, jq) {
            $.fn.bsgrid.getGridObj(options.gridId).page(page_index + 1);
            return false;
        }
    });
};