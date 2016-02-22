
$(document).ready(function() {
    var state = {};
    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
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
        var valid = true;
        $this.find(":input[type='email']").each(function() {
          var val = $(this).val();
          if(validateEmail(val)) {
            //good
          } else {
            console.log("Email is invalid", $this.children(".message-content"), $this);
            $this.find(".message-content").html("E-mail address is not valid.");
            valid = false;
          }
        });
        if (!valid) return false;
        var nextForm = $this.data('next');
        $this.find(":input").each(function() {
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
