module.exports = {
  stylesheet: ["pdf-style.css"],
  pdf_options: {
    format: "Letter",
    printBackground: true,
    displayHeaderFooter: true,
    margin: {
      top: "0.55in",
      right: "0.5in",
      bottom: "0.5in",
      left: "0.5in",
    },
    headerTemplate: `
      <div style="width:100%; font-size:7.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color:#8a9aab; padding: 0 0.5in;">
        <div style="border-bottom: 1px solid #d4dde6; padding-bottom: 4px;">
          <span style="color:#1a4d6d; font-weight:600;">Cameron Sanderson</span>
          <span style="float:right;">Agent evaluation &middot; exploratory brief</span>
        </div>
      </div>
    `,
    footerTemplate: `
      <div style="width:100%; font-size:7.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color:#8a9aab; padding: 0 0.5in; text-align:center;">
        Public-safe write-up &middot; not a production validation claim &middot; <span class="pageNumber"></span> / <span class="totalPages"></span>
      </div>
    `,
  },
};
