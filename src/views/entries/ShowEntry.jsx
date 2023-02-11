const React = require('react');
const Layout = require('../Layout');

module.exports = function ShowEntry({ entry, user }) {
  return (
    <Layout user={user}>
      <h1>{entry.title}</h1>

      <span className="entry-date block font-3-4 c-lt-gray">Written on {entry.createdAt.toString()} by {entry.get().User.get().name} </span>
      <p>{entry.body}</p>
      {(entry.userID === user.id)

        ? (
          <ul id="editAndDeleteUl" className="no-bullets no-padding mar-t-2">
            <li className="pipe-separate left">
              <a href={`/entries/${entry.id}/edit`} className="c-white">edit</a>
            </li>

            <li className="pipe-separate left">
              <button
                id="deleteEntryButton"
                data-entryid={entry.id}
                value="delete"
                type="button"
                className="no-border no-outline no-bg c-white hover-underline"
              >
                delete
              </button>
            </li>
          </ul>
        )
        : <div />}
    </Layout>
  );
};
