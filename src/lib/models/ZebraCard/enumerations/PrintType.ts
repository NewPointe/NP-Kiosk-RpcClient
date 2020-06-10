export const enum PrintType {
    /** 24bpp image that will be printed on the yellow, magenta, and cyan ribbon panels. */
    Color = 0,
    
    /** 1bpp image that will be printed on the UV ribbon panel. */
    MonoUV = 1,

    /** 1bpp image that will be printed on a monochrome ribbon panel. */
    MonoK = 2,

    /** 1bpp image that will be printed on the white resin (Wr) ribbon panel. */
    WhiteResin = 3,

    /** 1bpp image to be printed on the overlay (O) or laminate (L) ribbon panel. PrintType.Overlay used in conjunction with GraphicType.NA will produce full overlay coverage. */
    Overlay = 4,

    /** 8bpp image that will be printed on the UV ribbon panel. For ZMotif Series printers only. */
    GrayUV = 5,

    /** 8bpp image that will be printed on a monochrome ribbon panel. */
    GrayDye = 6,

    /** 1bpp image that masks out an area to 'inhibit' printing. For ZMotif Series 8 and 9 only. Specified area will not be printed on. */
    Inhibit = 7,

    /** Specifies that the ribbon helper (H) or dye receptive (D) panel should be used when printing the job. Must be used in conjunction with GraphicType.NA. */
    Helper = 8,

    /** 8bpp image that will be printed on the ghost panel. For ZMotif Series 7 printers only. */
    GrayGhost = 9,

    /** 1bpp image that will be printed on the ghost panel. For ZMotif Series 7 printers only. */
    MonoGhost = 10,

    /** 1bpp image that will be printed on the silver resin (Sr) ribbon panel. */
    SilverResin = 11,

    /** 1bpp image that will be printed on the pearlescent (P) ribbon panel. */
    Pearl = 12
}
