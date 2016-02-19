
$(document).ready(function() {
    var state = {};
    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
    function showStep(selector) {
        console.log("showStep", selector, state);
        $('#send-mail > div').hide();
        $(selector).show();
    }
    $("#send-mail button[type!='submit']").click(function(e) {
        if (e.preventDefault) e.preventDefault();
        var $this = $(this);
        var key = $this.attr('name');
        var value = $this.text();
        var nextForm = $this.data('next');
        if (!nextForm || !key || !value) {
            console.log("Bad button", nextForm, key, value, this);
            return false;
        }
        state[key] = value;
        showStep(nextForm);
        return false;
    });
    $("#send-mail form").submit(function(e) {
        if (e.preventDefault) e.preventDefault();
        var $this = $(this);
        var nextForm = $this.data('next');
        $this.children(":input").each(function() {
            state[this.name] = $(this).val();
        });
        if (nextForm === "#last-modal") {
            console.log("Submiting:", state);
            //do ajax
            var responseDiv = $('#last-modal .status')
            $.ajax({
                url: '//formspree.io/alex@editllc.com',
                method: 'POST',
                data: $.param(state),
                dataType: 'json',
                beforeSend: function() {
                    responseDiv.append('<div class="alert alert--loading">Sending message…</div>');
                },
                success: function(data) {
                    //$contactForm.find('.alert--loading').hide();
                    responseDiv.append('<div class="alert alert--success">Message sent!</div>');
                },
                error: function(err) {
                    //$contactForm.find('.alert--loading').hide();
                    responseDiv.append('<div class="alert alert--error">Ops, there was an error.</div>');
                }
            });
            showStep(nextForm);
        } else {
            showStep(nextForm);
        }
        return false;
    });
    $('#show-modal').click(function() {
        state = {};
        $("#send-mail input,textarea").val('');
        showStep("#first-modal")
    });
})