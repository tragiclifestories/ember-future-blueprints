import Service from 'ember-service';
<% if (extendStyle) { %>
export default Service.extend({
})
<% } else { %>
export default class <%= classifiedModuleName %> extends Service {
}
<% } %>
