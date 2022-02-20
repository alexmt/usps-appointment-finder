# USPS Passport appointment finder

Usage:

```
docker build -t apt-finder .
docker run -e ZIP=<YOUR-ZIP> --rm -it apt-finder
getting locations ids...
found 5 locations
getting appointments for 20220221 MISSION SANTA CLARA
found 0 appointments
getting appointments for 20220221 AGNEW
found 0 appointments
getting appointments for 20220221 CUPERTINO
found 0 appointments
getting appointments for 20220221 CAMPBELL
found 0 appointments
getting appointments for 20220221 SUNNYVALE
found 0 appointments
getting appointments for 20220222 MISSION SANTA CLARA
found 0 appointments
getting appointments for 20220222 AGNEW
found 0 appointments
getting appointments for 20220222 CUPERTINO
found 0 appointments
getting appointments for 20220222 CAMPBELL
found 0 appointments
getting appointments for 20220222 SUNNYVALE
found 0 appointments
getting appointments for 20220223 MISSION SANTA CLARA
found 0 appointments
getting appointments for 20220223 AGNEW
found 0 appointments
getting appointments for 20220223 CUPERTINO
found 0 appointments
getting appointments for 20220223 CAMPBELL
found 0 appointments
getting appointments for 20220223 SUNNYVALE
found 0 appointments
getting appointments for 20220224 MISSION SANTA CLARA
found 0 appointments
getting appointments for 20220224 AGNEW
found 0 appointments
getting appointments for 20220224 CUPERTINO
found 0 appointments
getting appointments for 20220224 CAMPBELL
found 0 appointments
getting appointments for 20220224 SUNNYVALE
found 0 appointments
getting appointments for 20220225 MISSION SANTA CLARA
found 0 appointments
getting appointments for 20220225 AGNEW
found 0 appointments
getting appointments for 20220225 CUPERTINO
found 0 appointments
getting appointments for 20220225 CAMPBELL
found 0 appointments
getting appointments for 20220225 SUNNYVALE
found 0 appointments
getting appointments for 20220226 MISSION SANTA CLARA
found 0 appointments
getting appointments for 20220226 AGNEW
found 0 appointments
getting appointments for 20220226 CUPERTINO
found 0 appointments
getting appointments for 20220226 CAMPBELL
found 0 appointments
getting appointments for 20220226 SUNNYVALE
found 0 appointments
getting appointments for 20220227 MISSION SANTA CLARA
found 0 appointments
getting appointments for 20220227 AGNEW
found 0 appointments
getting appointments for 20220227 CUPERTINO
found 0 appointments
getting appointments for 20220227 CAMPBELL
found 0 appointments
getting appointments for 20220227 SUNNYVALE
found 0 appointments
getting appointments for 20220228 MISSION SANTA CLARA
found 0 appointments
getting appointments for 20220228 AGNEW
found 0 appointments
getting appointments for 20220228 CUPERTINO
found 1 appointments
[
  {
    appointmentId: 13,
    schedulingType: 'PASSPORT',
    appointmentStatus: 'Available',
    startTime: '01:30 PM',
    startDateTime: '2022-02-28T13:30:00',
    endTime: '01:45 PM',
    endDateTime: '2022-02-28T13:45:00',
    selectable: false
  }
]
getting appointments for 20220228 CAMPBELL
```