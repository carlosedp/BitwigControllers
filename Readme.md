# Controller Scripts for Bitwig Studio

Install the scripts in the Bitwig User directory:

* Windows: `%USER%/Documents\Bitwig Studio\Controller Scripts`
* Mac: `~/Documents/Bitwig Studio/Controller Scripts`
* Linux: `~/Documents/Bitwig Studio/Controller Scripts`

## Controller Specific:

Here is the documentation for each controller.

### MPK Mini Alternative Mappings

The first fix is that the script passes the notes played by the pads correctly to the instrument. In the original script, only the keys were recorded into the track.

The script is based on MPK Mini factory preset #1. These presets can be downloaded from [Akai website][akai] and loaded with the Preset Editor.

#### MPK mini Bank 1 CCs:

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

#### MPK mini Bank 2 CCs (Similar to BitWig default script):

    |---------|     |---------|     |---------|     |---------|
    |  Pad 13 |     |  Pad 14 |     |  Pad 15 |     |  Pad 16 |
    |  CC#35  |     |  CC#36  |     |  CC#37  |     |  CC#38  |
    | PrevDev |     | NextDev |     |  TrkUp  |     |  TrkDn  |
    |_________|     |_________|     |_________|     |_________|
    
    |---------|     |---------|     |---------|     |---------|
    |  Pad 9  |     |  Pad 10 |     |  Pad 11 |     |  Pad 12 |
    |  CC#28  |     |  CC#29  |     |  CC#30  |     |  CC#31  |
    | Note Ed |     | Automat |     |  Mixer  |     |  Device |
    |_________|     |_________|     |_________|     |_________|

**Play:** Triggers the " Global Play" on transport. Lights up when playing.  
**Stop:** Global Stop transport.  
**Record:** Global Record. Lights up when toggled.  
**Loop:** Arranger Loop Toggle. Lights up when toggled.  
**TapTempo:** Tap 5 times to set the project tempo.  
**OvrDub:** Overdub. Lights up when toggled.  
**TrkUp:** Selects previous track.  
**TrkDn:** Selects next track.  
**Prev Dev:** Selects previous device in current track.  
**Next Dev:** Selects next device in current track.  
**Note Ed:** Opens Note Editor pane.  
**Automat:** Opens automation pane.  
**Mixer:** Opens mixer pane.  
**Device:** Opens device pane.  

The knobs control device macros.

[sm]: https://github.com/stylemistake
[akai]: http://www.akaipro.com/product/mpkmini#downloads

