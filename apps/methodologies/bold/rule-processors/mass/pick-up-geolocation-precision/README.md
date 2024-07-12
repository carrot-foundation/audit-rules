<div align="center">

  <h1 style="margin-bottom: -15px;">Pick Up Geolocation Precision</h1>

  <p style="margin-bottom: 32px;"> Methodology: <strong>Bold</strong> </p>

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/carrot-foundation/audit-rules/check-and-deploy.yaml)](https://github.com/carrot-foundation/smaug/actions)

</div>

<div dir="auto">
  <table>
    <thead>
      <tr align="left">
        <th>📄 Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Ensure that the address of the event with `move-type` declared as `Pick-up` is the same address of the SOURCE participant homologation process and consider a 2km radius as the precision limit margin between the homologated and reported geolocations.</td>
      </tr>
    </tbody>
  </table>
</div>

### 📂 Implementation

- **[Main Implementation File](./src/lib/pick-up-geolocation-precision.processor.ts)**

### 👥 Contributors

[<img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/43973049?v=4&h=60&w=60&fit=cover&mask=circle&maxage=7d" >](https://github.com/AMarcosCastelo) [<img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/12521890?v=4&h=60&w=60&fit=cover&mask=circle&maxage=7d" >](https://github.com/andtankian) [<img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/7927374?v=4&h=60&w=60&fit=cover&mask=circle&maxage=7d" >](https://github.com/cris-santos) [<img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/49005645?v=4&h=60&w=60&fit=cover&mask=circle&maxage=7d" >](https://github.com/gabrielsl96) [<img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/26340386?v=4&h=60&w=60&fit=cover&mask=circle&maxage=7d" >](https://github.com/GLGuilherme) [<img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/45052895?v=4&h=60&w=60&fit=cover&mask=circle&maxage=7d" >](https://github.com/RafaPalau) [<img src="https://images.weserv.nl/?url=avatars.githubusercontent.com/u/11515359?v=4&h=60&w=60&fit=cover&mask=circle&maxage=7d" >](https://github.com/sangalli)

## 🔑 License

[License](https://github.com/carrot-foundation/audit-rules/blob/main/LICENSE)
