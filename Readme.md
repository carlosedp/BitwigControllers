
# MPK Mini Alternative Mappings

The first fix is that the script passes the notes played by the pads correctly to the instrument. In the original script, only the keys were recorded into the track.

The script is based on MPK Mini factory preset #1. These presets can be downloaded from [Akai website][akai] and loaded with the Preset Editor.

MPK mini Bank 1 CCs:

|---------|     |---------|     |---------|     |---------|
|  Pad 5  |     |  Pad 6  |     |  Pad 7  |     |  Pad 8  |
|  CC#24  |     |  CC#25  |     |  CC#26  |     |  CC#27  |
| TapTempo|     |  OvrDub |     |  TrkUp  |     |  TrkDn  |
|_________|     |_________|     |_________|     |_________|

|---------|     |---------|     |---------|     |---------|
|  Pad 1  |     |  Pad 2  |     |  Pad 3  |     |  Pad 4  |
|  CC#20  |     |  CC#21  |     |  CC#22  |     |  CC#23  |
|  Play   |     |  Stop   |     |  Record |     |  Loop   |
|_________|     |_________|     |_________|     |_________|

The Tap Tempo pad is an implementation borrowed from [StyleMistake][sm] since BitWig does not provide a TapTempo method. It takes 5 taps to update the song tempo.

The knobs control device macros.

MPK mini Bank 2 CCs (Same as BitWig default script):

|---------|     |---------|     |---------|     |---------|
|  Pad 13 |     |  Pad 14 |     |  Pad 15 |     |  Pad 16 |
|  CC#35  |     |  CC#36  |     |  CC#37  |     |  CC#38  |
|         |     |         |     |         |     |         |
|_________|     |_________|     |_________|     |_________|

|---------|     |---------|     |---------|     |---------|
|  Pad 9  |     |  Pad 10 |     |  Pad 11 |     |  Pad 12 |
|  CC#28  |     |  CC#29  |     |  CC#30  |     |  CC#31  |
| Note Ed |     | Automat |     |  Mixer  |     |  Device |
|_________|     |_________|     |_________|     |_________|

[sm]: https://github.com/stylemistake
[akai]: http://www.akaipro.com/product/mpkmini#downloads

