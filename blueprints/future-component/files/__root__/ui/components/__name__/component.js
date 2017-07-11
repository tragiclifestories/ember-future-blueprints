import Component from 'ember-component';
<%= importTemplate %>
<% if (extendStyle) { %>
export default Component.extend({<%= contents %>
});

<% } else { %>
export default class <%= classifiedModuleName %> extends Component {<%= contents %>
}
<% } %>
