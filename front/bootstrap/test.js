ModalUtil=window.ModalUtil||{}
$.extend(ModalUtil,{
    create:function(_options){
        var options=$.extend({show:true,close:false,ok:'确定',cancel:'取消',backdrop:'static'},_options);

        if(options.title){
            var title=['<div class="modal-header">',
                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
                '<h4 class="modal-title">'+options.title+'</h4>',
                '</div>'].join('');
        }
        var html=['<div class="modal fade">',
            ' <div class="modal-dialog" ',
            'style="'+ (options.width?('width:'+options.width):'')+'"',
            '>',

            '<div class="modal-content">',
            title?title:'',
            ' <div class="modal-body">',
            options.content,
            ' </div>',
            ' <div class="modal-footer">',
            options.onOk?(  ' <button type="button" class="btn btn-primary btn-ok">'+options.ok+'</button>'):'',
            options.noCancel?'':(	'<button type="button" class="btn btn-default" data-dismiss="modal">'+options.cancel+'</button>'),
            ' </div>',
            ' </div>',
            ' </div>',
            '</div>'].join('');
        var dom=$(html);
        dom.appendTo(document.body);
        dom.modal({backdrop:options.backdrop,show:!!options.show});
        options.onOk&&dom.find('.btn-ok').click(options.onOk);//确定键
        options.onCancel&&dom.find('.btn-cancel').click(options.onCancel);//取消键
        (options.close)&&(dom.on('hidden.bs.modal', function (e) {//移除
            dom.remove();
        }))
        return dom;
    },
    showCustomerInfo:function(url){
        var html=['<div class="modal fade">',
            ' <div class="modal-dialog" style="width:100%;height:100%">',
            '<div class="modal-content">',
            '<div class="modal-header">',
            '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
            '<h4 class="modal-title">客户信息</h4>',
            '</div>',
            ' <div class="modal-body">',
            '<iframe frameborder="0" scrolling="auto" width="100%" height="'+($(window).height()-30)+'" src="'+url+'"></iframe>',
            ' </div>',
            ' </div>',
            ' </div>',
            '</div>'].join('');
        var dom=$(html);
        dom.appendTo(document.body);
        dom.modal({backdrop:'static'});
    }
});