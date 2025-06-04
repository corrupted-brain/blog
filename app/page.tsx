"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Code,
  Award,
  BookOpen,
  Mic,
  ExternalLink,
  Mail,
  Linkedin,
  Github,
  Twitter,
  Zap,
  User,
} from "lucide-react"

export default function AboutMePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const skills = [
    "Penetration Testing",
    "Vulnerability Assessment",
    "Network Security",
    "Web Application Security",
    "Mobile Security",
    "Cloud Security",
    "Incident Response",
    "Digital Forensics",
    "Security Architecture",
    "Risk Assessment",
    "Compliance",
    "Security Training",
  ]

  const certifications = [
    { name: "CISSP", org: "ISC²", year: "2023" },
    { name: "CEH", org: "EC-Council", year: "2022" },
    { name: "OSCP", org: "Offensive Security", year: "2021" },
    { name: "CISSP", org: "ISC²", year: "2023" },
  ]

  const talks = [
    {
      title: "Advanced Web Application Security Testing",
      event: "CyberSec Nepal 2024",
      date: "March 2024",
      location: "Kathmandu, Nepal",
      description: "Deep dive into modern web application vulnerabilities and testing methodologies.",
    },
    {
      title: "Building Secure Cloud Infrastructure",
      event: "DevSecOps Summit",
      date: "January 2024",
      location: "Virtual",
      description: "Best practices for implementing security in cloud-native applications.",
    },
    {
      title: "Mobile Security: Beyond the Basics",
      event: "InfoSec Conference",
      date: "November 2023",
      location: "Pokhara, Nepal",
      description: "Advanced mobile security testing techniques and emerging threats.",
    },
    {
      title: "Incident Response in the Modern Era",
      event: "Security Professionals Meetup",
      date: "September 2023",
      location: "Kathmandu, Nepal",
      description: "Effective incident response strategies for contemporary cyber threats.",
    },
  ]

  const experience = [
    {
      role: "Senior Security Consultant",
      company: "CyberGuard Solutions",
      period: "2022 - Present",
      description: "Leading security assessments and penetration testing for enterprise clients.",
    },
    {
      role: "Security Analyst",
      company: "SecureNet Inc.",
      period: "2020 - 2022",
      description: "Conducted vulnerability assessments and security audits for various organizations.",
    },
    {
      role: "Junior Penetration Tester",
      company: "InfoSec Labs",
      period: "2019 - 2020",
      description: "Performed web application and network penetration testing.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Matrix-like background pattern */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%2300ff00' fillOpacity='0.1'%3E%3Ctext x='10' y='20' fontFamily='monospace' fontSize='8'%3E01%3C/text%3E%3Ctext x='30' y='40' fontFamily='monospace' fontSize='8'%3E10%3C/text%3E%3Ctext x='10' y='50' fontFamily='monospace' fontSize='8'%3E11%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Kailash Bohara</h1>
                  <p className="text-sm text-slate-400">Cybersecurity Professional</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-6">
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-emerald-400"
                  onClick={() => setActiveSection("about")}
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-emerald-400"
                  onClick={() => setActiveSection("experience")}
                >
                  Experience
                </Button>
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-emerald-400"
                  onClick={() => setActiveSection("talks")}
                >
                  Talks
                </Button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div
              className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="mb-8">
                <div className="w-32 h-32 mx-auto mb-6 relative">
                  <div className="w-full h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full p-1">
                    <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                      <img
                        src="/placeholder.svg?height=120&width=120"
                        alt="Kailash Bohara"
                        className="w-28 h-28 rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Securing the
                <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  Digital World
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Cybersecurity professional with expertise in penetration testing, vulnerability assessment, and security
                architecture. Passionate about protecting organizations from evolving cyber threats.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Portfolio
                </Button>
              </div>

              <div className="flex justify-center space-x-6">
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
                <TabsTrigger
                  value="about"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  About Me
                </TabsTrigger>
                <TabsTrigger
                  value="experience"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  <Code className="w-4 h-4 mr-2" />
                  Experience
                </TabsTrigger>
                <TabsTrigger
                  value="talks"
                  className="data-[state=active]:bg-emerald-500/20 data-[state=active]:text-emerald-400"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Talks & Speaking
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* About Content */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <User className="w-5 h-5 mr-2 text-emerald-400" />
                        About Me
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-slate-300 space-y-4">
                      <p>
                        I'm a passionate cybersecurity professional with over 5 years of experience in protecting
                        organizations from cyber threats. My expertise spans across penetration testing, vulnerability
                        assessments, and security architecture design.
                      </p>
                      <p>
                        I believe in continuous learning and staying ahead of the evolving threat landscape. When I'm
                        not securing systems, you'll find me researching the latest security trends, contributing to
                        open-source security tools, or sharing knowledge through speaking engagements.
                      </p>
                      <p>My mission is to make the digital world safer, one system at a time.</p>
                    </CardContent>
                  </Card>

                  {/* Skills */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-emerald-400" />
                        Core Skills
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-slate-700/50 text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Certifications */}
                <Card className="bg-slate-800/50 border-slate-700 mt-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Award className="w-5 h-5 mr-2 text-emerald-400" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {certifications.map((cert, index) => (
                        <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                          <h3 className="font-semibold text-emerald-400">{cert.name}</h3>
                          <p className="text-sm text-slate-400">{cert.org}</p>
                          <p className="text-xs text-slate-500">{cert.year}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience" className="mt-8">
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <Card key={index} className="bg-slate-800/50 border-slate-700">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                            <p className="text-emerald-400">{exp.company}</p>
                          </div>
                          <Badge variant="outline" className="border-slate-600 text-slate-400 mt-2 md:mt-0">
                            {exp.period}
                          </Badge>
                        </div>
                        <p className="text-slate-300">{exp.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="talks" className="mt-8">
                <div className="grid gap-6">
                  {talks.map((talk, index) => (
                    <Card
                      key={index}
                      className="bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2">{talk.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                <Mic className="w-3 h-3 mr-1" />
                                {talk.event}
                              </Badge>
                              <span className="text-slate-400 text-sm">{talk.date}</span>
                              <span className="text-slate-500 text-sm">{talk.location}</span>
                            </div>
                            <p className="text-slate-300">{talk.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-400 hover:text-emerald-300 mt-4 lg:mt-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Speaking Topics */}
                <Card className="bg-slate-800/50 border-slate-700 mt-8">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-emerald-400" />
                      Speaking Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-emerald-400">Technical Topics</h4>
                        <ul className="text-slate-300 space-y-1 text-sm">
                          <li>• Advanced Penetration Testing Techniques</li>
                          <li>• Web Application Security</li>
                          <li>• Cloud Security Architecture</li>
                          <li>• Mobile Security Testing</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-emerald-400">Strategic Topics</h4>
                        <ul className="text-slate-300 space-y-1 text-sm">
                          <li>• Building Security Culture</li>
                          <li>• Incident Response Planning</li>
                          <li>• Risk Management Strategies</li>
                          <li>• Security Awareness Training</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="flex justify-center space-x-6 mb-6">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400">
                <Mail className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-emerald-400">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-slate-400">
              © 2024 Kailash Bohara. Securing the digital frontier, one system at a time.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
