import { useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import { ShoppingCart, Heart, Share2, Loader, ArrowLeft, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

// Real products data with carousel images
const PRODUCTS_DB = [
  { 
    id: 1, 
    name: 'MacBook Pro 16"', 
    slug: 'macbook-pro-16', 
    price: 249900, 
    originalPrice: 299900, 
    category: 'Laptops', 
    rating: 4.8, 
    reviewCount: 342, 
    stock: 15, 
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/wVEtjEqxIBaKourD.png',
    images: [
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/r7YYZFWPvkaovmcEgcojJ9-img-1_1770608255000_na1fn_bWFjYm9vay1wcm8tMTYtdmlldzE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L3I3WVlaRldQdmthb3ZtY0VnY29qSjktaW1nLTFfMTc3MDYwODI1NTAwMF9uYTFmbl9iV0ZqWW05dmF5MXdjbTh0TVRZdGRtbGxkekUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Dklo15FNE9Z52AyHK6IO4GFFFqRbuEKKehx58Y4BALuTPLXQs1hg5QgFE7MVBYjMUYkMrXCVh-CNrUo5d4Bg1qiE6uzL3JsTYfAOoJpbAMOabxMstIb9zRYW5mc11AzsAd5ASujJ250PM7OCOi8d4MqeKkOm4yWEUoJmszAEymiVE6ID~dc0ZX7MqHzwv8KbyVROjdbTVMS07qRnk4afAN8JOricauSekyf5amW4bsppC4MHibMhEf6jZ7180OoYWfgbapckDTyo2~SeE4Rvvsie1A~n7~F8-gbjuaBCNei-sBAtZO~5dW-3bBRaRj1wnOFL2CIlCWzOVMnsB42-xA__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/r7YYZFWPvkaovmcEgcojJ9-img-2_1770608253000_na1fn_bWFjYm9vay1wcm8tMTYtdmlldzI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L3I3WVlaRldQdmthb3ZtY0VnY29qSjktaW1nLTJfMTc3MDYwODI1MzAwMF9uYTFmbl9iV0ZqWW05dmF5MXdjbTh0TVRZdGRtbGxkekkucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=c5ty5Emz~7hiG73K4NFzgNZbx8JLfgg~Nzxgv4bPfBQWY8Fbxu8L6eLDf~~~qwiEhqrTz~Bg75n-vMAbeMOmHtJfurm0xfgVBzvnwDEhS4WxA3WngaO8S~iEG5JtM-rBSQVX1NoUFrs-6ijLlzDoO~yOjAnDM0~Xsx2iMHYoCBeUhj~7kn3kMoGFLPqeFdKgfbPDUzOpwAUTJEsieBQgUqbT9ScKqcBf2Sw7LCJclpvYsZmNsOkZLQdIiJtPzBgCPFKEusZj~sf4hXnNf9VKgYmn~yuYP2EivZlcw2qFAJ3eLrPIEwOhKNhs-BZm932W9P8JxxXDfSo67O2-uHAbfQ__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/r7YYZFWPvkaovmcEgcojJ9-img-3_1770608256000_na1fn_bWFjYm9vay1wcm8tMTYtdmlldzM.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L3I3WVlaRldQdmthb3ZtY0VnY29qSjktaW1nLTNfMTc3MDYwODI1NjAwMF9uYTFmbl9iV0ZqWW05dmF5MXdjbTh0TVRZdGRtbGxkek0ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=gFK9Px1pizudY2-9qVwGFg-javXTr4IpNKpX9SjgQ5d91qvAl-~r0WMIxOjn7XrYeu1aLGFmOBsqP35I1S7pmmkXUu-~e16SNl33kYJZ5HR2A1hSz8FQo7Bq2NF-KoVK1x-Ybvj5tqkhguBNDw8oSpXwekFnnj2W7G7dEOHtsX7N2C-JOBjc47~Vv-ykA8hytUq0G2SCeHqLMyRWsv-d~cK8bw3nEK6XlNZCSlIGqQ83bDAxUwO3V6BMno5bvNWx3DNiW0KD40zbl24~vlAHaptBLPinZ63t8vIJRl05t8SPvAhAqhovn1z0ck-jM1~9Me9Xaikf0ManE1DhkdYdjw__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/r7YYZFWPvkaovmcEgcojJ9-img-4_1770608257000_na1fn_bWFjYm9vay1wcm8tMTYtdmlldzQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L3I3WVlaRldQdmthb3ZtY0VnY29qSjktaW1nLTRfMTc3MDYwODI1NzAwMF9uYTFmbl9iV0ZqWW05dmF5MXdjbTh0TVRZdGRtbGxkelEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=gpP5dmi~bjHadDXh1tS-AsoD2ta2-RIIK8-bv-ArNMo6T4OSbEUDnzBE8ZL-B8ymslJlXMrCfG7YQS~qR~0WoSVRuBwbKcQakJz67rB86nbRrYXSbNf8mRGt3SVDBjUPBn1LUJbZagRP4Zp6YOa4fiAdGJQhI9iGtHVMedIP6MRK0lbLKE2zHVVYfWZ1q6Pw8ABaORfnYySql9p-yn4Q6DniJbdrEHZiCQI5T65SHwak4crWTbt78AuxWFu8Zvv7Nf6r7SCYlwMpiaZWEACEc5FQMjE3q9a4s256EugkCHBOa-Aag3zsY6J955Aa6SXMCzLTJe7ddmnfS05Vg4iEjw__'
    ],
    description: 'Powerful 16-inch MacBook Pro with M3 Max chip, perfect for professionals and creators who demand the best performance.', 
    specs: { processor: 'Apple M3 Max', ram: '36GB', storage: '1TB SSD', display: '16-inch Liquid Retina XDR' } 
  },
  { 
    id: 3, 
    name: 'iPhone 15 Pro Max', 
    slug: 'iphone-15-pro-max', 
    price: 159900, 
    originalPrice: 179900, 
    category: 'Smartphones', 
    rating: 4.9, 
    reviewCount: 512, 
    stock: 25, 
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/PEDTHAQjEVxQIkSf.png',
    images: [
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/HRHRrzMjuFyW9ZU33LuGVJ-img-1_1770608282000_na1fn_aXBob25lLTE1LXByby1tYXgtdmlldzE.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L0hSSFJyek1qdUZ5VzlaVTMzTHVHVkotaW1nLTFfMTc3MDYwODI4MjAwMF9uYTFmbl9hWEJvYjI1bExURTFMWEJ5YnkxdFlYZ3RkbWxsZHpFLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=BAefj5UEdDXeBjer7iWJWg2VTTmuhfrrGgRrZKknfy2cM-BFsHu1E7ak74dNWjYN49Nyp-PQ6IhBCd-Z4iWezR83HmqIOtzlPF4BUeVkxCeCAIjLRypNHF5x4rkwW69pxDKSRHgZqWOnytIZFXQkdX6xTTe4UhyxOH41s1cs3fGOyR3jd2dg3Pcsvdr2Cn~UHl73QpzOnwut19j2AanPpt9WEUifRFGeGF26hyYnxSuCabJHplhDni9hMiE6qvV~1HSGxslhtSwJAeAAxiUlcLQy8ae7ZKYQL3xZ49U-izL8mb7-AAtaDY5IqFVadriMYbTX9cDfbcTSxiZq7c7Jqw__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/HRHRrzMjuFyW9ZU33LuGVJ-img-2_1770608284000_na1fn_aXBob25lLTE1LXByby1tYXgtdmlldzI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L0hSSFJyek1qdUZ5VzlaVTMzTHVHVkotaW1nLTJfMTc3MDYwODI4NDAwMF9uYTFmbl9hWEJvYjI1bExURTFMWEJ5YnkxdFlYZ3RkbWxsZHpJLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=PkCZRq~xH2mUm9QTjOYyrq5uei3vYL2we2D6Xw22dz6dwgcbBmfk3fS4zxENPOHXJUit1h5VhPaOCXi26WSTWeYtonVze9RS2XXF9AE5naKYQmd-nkHgIW2uPKmvfQ-XCMhPmcMsFGH4dOrvCYIE9Dz0vTXF8oWzTd~gqhOE7orEiNaz7fbFSFMpTQ-JWjuRINeT3YAXWNe1CIeJ8Sy0WaPlacGVTEyQxCkic36OvDiCTfaIM4PjHozIJzQ4CaBhIEDMy8KM9KKFAGoCPCskS1FCso2-31iUow29kCEEKq7K5k9OkDjtV7kl0HAMnRJCCZH9J3pRm9spmV3tnQMqDA__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/HRHRrzMjuFyW9ZU33LuGVJ-img-3_1770608281000_na1fn_aXBob25lLTE1LXByby1tYXgtdmlldzM.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L0hSSFJyek1qdUZ5VzlaVTMzTHVHVkotaW1nLTNfMTc3MDYwODI4MTAwMF9uYTFmbl9hWEJvYjI1bExURTFMWEJ5YnkxdFlYZ3RkbWxsZHpNLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=G4e0H0LLy2whNdHLpNmQ0H65SRcJyeVFKibmzX~j2J-0A25IJYW9UxEhdCyWAKc2mNf2kCZFpHDBX9TsvtITpNg3Xcvi2WIEU4JQVJNvDYLQRBH6hDDDXhkrrtw~kNqHD2Zp6ZlKwGNFPiIJgh3Ewi~5iVlRvKMmz4qkhwqcz80Gt6nQw2lD1aLOj2swHdR2KLICO~-VI8bKSlPX6UpeZCbF9D4x6E3TJdii3BVBsJmSaijbukRxeiQFRJ8IsQ5FTT-zGc3K36xHB-VzeysfsTmN4JTljP5a10OXmJSqcAcWzwGCbjCksMADsiSc2d3-XVz~ERaPoePf3yDhNYhzgQ__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/HRHRrzMjuFyW9ZU33LuGVJ-img-4_1770608287000_na1fn_aXBob25lLTE1LXByby1tYXgtdmlldzQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L0hSSFJyek1qdUZ5VzlaVTMzTHVHVkotaW1nLTRfMTc3MDYwODI4NzAwMF9uYTFmbl9hWEJvYjI1bExURTFMWEJ5YnkxdFlYZ3RkbWxsZHpRLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=VIdxAzlvQ6adhNLsRbMew8N3BUCppbp2C6WbzD04Hom3TBYWlduovxW9q56JnhDcG9E8qkRUFa1yLYYlbnnCjlUYsSVOREzCV5U3wu2MH3ZbFNdaMen2QWoeWS4ERid8N1CGVpmUgtkVa8L1tRYlfbJhHkPMDC7xyHT7iZ-VOlDj5Fn0HXtJeS70EeQJB4gQ11F3PoahCJSafWmAPpPtX5HoXspI8XaJd-YPXKF5IYMgGc~2AHCLaJKCfubR8ntO1olgtDObtHLHxjq4olyuzp0fJDPl3LAGByjvPi4MqSmM2OPw7XkK-2zsu5dv6-ReYdkstYLmP2riw3uiqZNVbA__'
    ],
    description: 'Latest flagship iPhone with advanced camera system and A17 Pro chip.', 
    specs: { processor: 'A17 Pro', ram: '8GB', storage: '256GB', display: '6.7-inch Super Retina XDR' } 
  },
  { 
    id: 4, 
    name: 'Samsung Galaxy S24', 
    slug: 'samsung-galaxy-s24', 
    price: 129900, 
    originalPrice: 149900, 
    category: 'Smartphones', 
    rating: 4.6, 
    reviewCount: 287, 
    stock: 20, 
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/nWKmLGBrzbTNKISn.png',
    images: [
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/3sSGJIxYBGjtLRWiUq6JoM-img-1_1770608347000_na1fn_c2Ftc3VuZy1nYWxheHktczI0LXZpZXcx.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94LzNzU0dKSXhZQkdqdExSV2lVcTZKb00taW1nLTFfMTc3MDYwODM0NzAwMF9uYTFmbl9jMkZ0YzNWdVp5MW5ZV3hoZUhrdGN6STBMWFpwWlhjeC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=X1OXTZjBg3ZK3RydHc2jMYWutb~N2sxtp-~ok8XSeEMVPrGR5-0-xDyMK6h9g2LqlYj2Z3robvpK6bH7QfD2luqi3IkUC5Rgjh~qPDKOTuWBKQ0kCduuM-Qqc3PWhhADA6xogtDncMQwSedIiKgy7gAnU9iMkLHpDCzjCthabtLaM27IQB~XZoY3r8ffVzUuapkHct1~~N9-5M3nGT~qBxmJsvdR1WDs8qBUiyaeslm02CWHDawAUISXf7ODMXvuWK5nDF3GBefFQciNG0aFB~ZLljRaI5E1SwHI2jESLkgdcVcEYDCw074rPSPC2iiD1n0JSWVEuYMgcGPSMi8QSw__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/3sSGJIxYBGjtLRWiUq6JoM-img-2_1770608347000_na1fn_c2Ftc3VuZy1nYWxheHktczI0LXZpZXcy.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94LzNzU0dKSXhZQkdqdExSV2lVcTZKb00taW1nLTJfMTc3MDYwODM0NzAwMF9uYTFmbl9jMkZ0YzNWdVp5MW5ZV3hoZUhrdGN6STBMWFpwWlhjeS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=vFudGYvBzu902scOycMD6Cz-DTHJoYnyOXtw6jHMsAqQxexcm0JbdOXDQCKL3VRnqjfnPFvCT2EDh6AtAOWDODU0NcDZVyEdbut9s0-KGNcFTTtE1vSLbzzNtk6cZPSyIwbQ~QlxK2S54i-~RWQtXAxRxtC2blaNzAMsnm6ZMkUzIGexRndDgJu0UOhH7SqlxCgDVGRBojGOauObc1Uz0UROeT-QQwt0mjaFWy3SYlxNmHWrEE-iLisxs~IwXih5lIcO3UXmWxUTDsMUk1DU8P5r0YZDSdKPc8LXanF8y9OLpUnPMkeOGnVFZexhLV3vk6X8RKy6HsJYroR7Dqlx7Q__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/3sSGJIxYBGjtLRWiUq6JoM-img-3_1770608345000_na1fn_c2Ftc3VuZy1nYWxheHktczI0LXZpZXcz.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94LzNzU0dKSXhZQkdqdExSV2lVcTZKb00taW1nLTNfMTc3MDYwODM0NTAwMF9uYTFmbl9jMkZ0YzNWdVp5MW5ZV3hoZUhrdGN6STBMWFpwWlhjei5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=aXwSDOuYoi0l-YQzVGTFtj5s7pTokaVTzXYk1hSEvZ1ks9KQAXBZN8BBbl6kY6-AnTULCnux1GapKNaYNFfEe2jV1oVgPzy0lwi7whA-nHusgS9z5hBx5JZ7h63d58YxYX~UYBaY9nt9MaNE4K1XHNdgIOoMMKncPsEVozipdWoE-h8ChGrdYiuBnpF12sf7BS6xJsl~HdEhKv-G3KW5xIh1nYrpSX9RHxrySa7WrNQWDgBv~i46nyZcgMS2hYeqPUX7WEZ7x6z1i~RCUW9~HkHA7ZIL1G06bkeZe2~qBrisft5g4Ey1hYEOeX74-xXyNo~fQyoxZFImxkH07Y6p9A__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/3sSGJIxYBGjtLRWiUq6JoM-img-4_1770608349000_na1fn_c2Ftc3VuZy1nYWxheHktczI0LXZpZXc0.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94LzNzU0dKSXhZQkdqdExSV2lVcTZKb00taW1nLTRfMTc3MDYwODM0OTAwMF9uYTFmbl9jMkZ0YzNWdVp5MW5ZV3hoZUhrdGN6STBMWFpwWlhjMC5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=k~QNhsLb5mvpf7Js39xHfKMk7QzUhqj7M6sDw6lFugIVZoxAHN8QbnwkiYU4ypbGkTiMKHN73KtGqgcVM66omHLZ6luzODficb6HGIe7fzY4VEqiZR4CLDrDKjALsoPWUuB7bK7iY7QbpPb2vS0hmMmU5L8CHmf5CwEKh~zIfnYANZz-7pwmYznOoB32zM-wG6tp5h7Tb9LapDn7PZOBmBeFtb12wNPMEBgeu6woH3x1cVUd~npmAZysyfVTBNUaPlqJc8h3Un8RZkvDXocGfwFtiFHyzqOFe-F8nJW9i8ExAiLUKllY8xcdNZmWCepceOD5gsL6uv7fAZX99gu7dw__'
    ],
    description: 'Cutting-edge Android flagship with AI features and excellent camera.', 
    specs: { processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '512GB', display: '6.2-inch Dynamic AMOLED' } 
  },
  { 
    id: 5, 
    name: 'Sony WH-1000XM5', 
    slug: 'sony-wh-1000xm5', 
    price: 39900, 
    originalPrice: 49900, 
    category: 'Audio', 
    rating: 4.8, 
    reviewCount: 623, 
    stock: 30, 
    image: 'https://files.manuscdn.com/user_upload_by_module/session_file/310519663050743602/lbIPPOlTeWArjRKW.png',
    images: [
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/M7VDoNnysW1KSds7Muhu4e-img-1_1770608314000_na1fn_c29ueS13aC0xMDAweG01LXZpZXcx.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L003VkRvTm55c1cxS1NkczdNdWh1NGUtaW1nLTFfMTc3MDYwODMxNDAwMF9uYTFmbl9jMjl1ZVMxM2FDMHhNREF3ZUcwMUxYWnBaWGN4LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=nVrdiCTUYAoBzxG4ppwK4YXN6XsmpZhqUil~YPXJKUk6hSx468YlYipQQY4p40SNTlRyZLr0XdSsfSObsNLP2J~Us~yDkrkjmzAz5tXFch6a7Xxwx5g8q~XLf9ok73NnF3c53-whiyBS1N7a8mBGPis~WaRRI3WNw3~7W~6dl4QtLBpizImcN75W6U9APctWVFZyx~~vIMgMbMKFln8ptL~tIocWBgEqyOHFPWhh7DnSd~SaJA0zUw4RLIjyDoJ4qWq8kISRhf73dJ6CXVcE0Cg6wORFgKHtw30oXtEJAzAKEMVVY0kVOtuGUUCwEWtxRCIHZiFWbCzpGNr3DGfHYg__',
      'https://private-us-east-1.manuscdn.com/sessionFile/70BeSONjdgQMeROPsWItJC/sandbox/M7VDoNnysW1KSds7Muhu4e-img-2_1770608322000_na1fn_c29ueS13aC0xMDAweG01LXZpZXcy.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNzBCZVNPTmpkZ1FNZVJPUHNXSXRKQy9zYW5kYm94L003VkRvTm55c1cxS1NkczdNdWh1NGUtaW1nLTJfMTc3MDYwODMyMjAwMF9uYTFmbl9jMjl1ZVMxM2FDMHhNREF3ZUcwMUxYWnBaWGN5LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=EpO2MvRCi-ZBkqn4rVD9Ba4~euWi8DGPhjK4ZJlQjHbufigJon0JFdGLjsalcVLKKbjGlyTgbyK2KOSbzuvvw2FoeJzrbPYR8t~WaQpPuWzRWWKOFw1MWmdjuRb7cEgaeL4xbVdbZjkvV-WMfWz9ZDizQs0MKVYryZxhtwtMj4p4hGRpBOpAenC6Uyh7aLm3zMR6ilDRY8vVc8H6JaAlymKU~eTxnxxyjrmIFbGQ1d6J92NGB8~nOl21fxvhK1mYMb5ZdH1s7OSTDrcNJUTbpsZ-6dQipnDcBPwgzNoXIFqZpc5AQpb8rs8wzFO44IOVCcX29GUBsWGG9DCKgbqPYQ__'
    ],
    description: 'Industry-leading noise-cancelling headphones with premium sound quality.', 
    specs: { type: 'Over-ear', driver: '40mm', battery: '30 hours', connectivity: 'Bluetooth 5.3' } 
  },
];

export default function ProductDetailDynamic() {
  const [, params] = useRoute('/product/:slug');
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const slug = params?.slug;
  const product = PRODUCTS_DB.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavigationHeader />
        <div className="container py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-foreground/60 mb-6">The product you're looking for doesn't exist.</p>
          <Button className="btn-primary" onClick={() => setLocation('/products')}>
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = PRODUCTS_DB.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    setQuantity(1);
    alert(`${product.name} added to cart!`);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? (product.images?.length || 1) - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === (product.images?.length || 1) - 1 ? 0 : prev + 1));
  };

  const currentImage = product.images?.[currentImageIndex] || product.image;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavigationHeader />

      <div className="container py-8">
        <button
          onClick={() => setLocation('/products')}
          className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Carousel */}
          <div className="space-y-6">
            <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl overflow-hidden border border-border flex items-center justify-center" style={{ aspectRatio: '1' }}>
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden border-2 cursor-pointer transition-colors ${
                      index === currentImageIndex ? 'border-accent' : 'border-border hover:border-accent'
                    }`}
                    style={{ aspectRatio: '1' }}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-accent text-sm font-semibold mb-2">{product.category}</p>
                  <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-foreground/60">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-3xl font-bold text-accent">₹{product.price.toLocaleString()}</span>
                <span className="text-lg text-foreground/50 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-sm bg-accent/20 text-accent px-3 py-1 rounded-full">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </p>
              </div>

              {/* Description */}
              <p className="text-foreground/70 mb-8">{product.description}</p>

              {/* Specifications */}
              <div className="bg-primary/5 rounded-lg p-6 mb-8">
                <h3 className="font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-foreground/60 text-sm capitalize">{key}</p>
                      <p className="font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-foreground/60 hover:text-foreground"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border-l border-r border-border">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-foreground/60 hover:text-foreground"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button
                className="w-full btn-primary flex items-center justify-center gap-2"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>

              <div className="flex gap-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex-1 flex items-center justify-center gap-2 border border-border rounded-lg py-3 hover:bg-primary/5 transition-colors"
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'text-red-500' : ''} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-border rounded-lg py-3 hover:bg-primary/5 transition-colors">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  onClick={() => setLocation(`/product/${relatedProduct.slug}`)}
                  className="border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden" style={{ aspectRatio: '1' }}>
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-accent font-bold">₹{relatedProduct.price.toLocaleString()}</span>
                      <span className="text-foreground/50 line-through text-sm">₹{relatedProduct.originalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(relatedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-foreground/60 text-sm ml-2">({relatedProduct.reviewCount})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
